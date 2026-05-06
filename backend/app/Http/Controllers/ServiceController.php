<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Http\Requests\ServiceRequest;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index(Request $request)
    {
        $query = Service::with(['vendor', 'reviews']);

        // Only show approved services to non-admins
        if (!$request->user() || $request->user()->role !== 'admin') {
            $query->where('status', 'approved');
        }

        if ($request->has(['lat', 'lng'])) {
            $lat = $request->lat;
            $lng = $request->lng;
            $radius = $request->get('radius', 50);

            $query->selectRaw("*, (6371 * acos(cos(radians(?)) * cos(radians(lat)) * cos(radians(lng) - radians(?)) + sin(radians(?)) * sin(radians(lat)))) AS distance", [$lat, $lng, $lat])
                ->having('distance', '<=', $radius)
                ->orderBy('distance');
        }

        return $query->get();
    }

    public function store(ServiceRequest $request)
    {
        $service = $request->user()->services()->create($request->validated());

        return response()->json($service, 201);
    }

    public function show(Service $service)
    {
        return $service->load(['vendor', 'reviews.user']);
    }

    public function update(ServiceRequest $request, Service $service)
    {
        if ($request->user()->id !== $service->user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $service->update($request->validated());

        return response()->json($service);
    }

    public function updateStatus(Request $request, Service $service)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'status' => 'required|in:approved,rejected,pending',
        ]);

        $service->update(['status' => $request->status]);

        return response()->json($service);
    }

    public function updateAvailability(Request $request, Service $service)
    {
        if ($request->user()->id !== $service->user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'dates' => 'required|array',
            'dates.*' => 'date_format:Y-m-d',
        ]);

        $service->availabilities()->delete();
        
        foreach ($request->dates as $date) {
            $service->availabilities()->create([
                'date' => $date,
                'is_available' => true,
            ]);
        }

        return response()->json(['message' => 'Availability updated successfully']);
    }

    public function destroy(Service $service, Request $request)
    {
        if ($request->user()->id !== $service->user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $service->delete();

        return response()->json(['message' => 'Service deleted successfully']);
    }
}
