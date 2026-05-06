<?php

namespace App\Http\Controllers;

use App\Models\Hall;
use App\Http\Requests\HallRequest;
use Illuminate\Http\Request;

class HallController extends Controller
{
    public function index(Request $request)
    {
        $query = Hall::with(['owner', 'packages', 'reviews']);

        // Only show approved halls to non-admins
        if (!$request->user() || $request->user()->role !== 'admin') {
            $query->where('status', 'approved');
        }

        if ($request->has(['lat', 'lng'])) {
            $lat = $request->lat;
            $lng = $request->lng;
            $radius = $request->get('radius', 50); // Default 50km

            // Haversine formula for distance calculation
            $query->selectRaw("*, (6371 * acos(cos(radians(?)) * cos(radians(lat)) * cos(radians(lng) - radians(?)) + sin(radians(?)) * sin(radians(lat)))) AS distance", [$lat, $lng, $lat])
                ->having('distance', '<=', $radius)
                ->orderBy('distance');
        }

        return $query->get();
    }

    public function store(HallRequest $request)
    {
        $hall = $request->user()->halls()->create($request->validated());

        return response()->json($hall, 201);
    }

    public function show(Hall $hall)
    {
        return $hall->load(['owner', 'packages', 'availabilities', 'reviews.user', 'acceptedCollaborations.service']);
    }

    public function update(HallRequest $request, Hall $hall)
    {
        if ($request->user()->id !== $hall->user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $hall->update($request->validated());

        return response()->json($hall);
    }

    public function updateStatus(Request $request, Hall $hall)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'status' => 'required|in:approved,rejected,pending',
        ]);

        $hall->update(['status' => $request->status]);

        return response()->json($hall);
    }

    public function updateAvailability(Request $request, Hall $hall)
    {
        if ($request->user()->id !== $hall->user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'dates' => 'required|array',
            'dates.*' => 'date_format:Y-m-d',
        ]);

        // Sync logic: for simplicity, we delete all and recreate, or selectively update.
        // Let's go with deleting current ones and recreating based on the provided array of 'available' dates.
        
        $hall->availabilities()->delete();
        
        foreach ($request->dates as $date) {
            $hall->availabilities()->create([
                'date' => $date,
                'is_available' => true,
            ]);
        }

        return response()->json(['message' => 'Availability updated successfully']);
    }

    public function destroy(Hall $hall, Request $request)
    {
        if ($request->user()->id !== $hall->user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $hall->delete();

        return response()->json(['message' => 'Hall deleted successfully']);
    }
}
