<?php

namespace App\Http\Controllers;

use App\Models\Availability;
use App\Models\Booking;
use App\Models\Hall;
use App\Models\Service;
use Illuminate\Http\Request;

class AvailabilityController extends Controller
{
    public function index($type, $id)
    {
        $entityType = $type === 'hall' ? 'App\Models\Hall' : ($type === 'service' ? 'App\Models\Service' : null);
        
        if (!$entityType) {
            return response()->json(['message' => 'Invalid entity type'], 400);
        }

        // Get explicit availability settings
        $availabilities = Availability::where('entity_type', $entityType)
            ->where('entity_id', $id)
            ->get();

        // Get confirmed bookings to show as red/unavailable
        $bookings = Booking::where('entity_type', $entityType)
            ->where('entity_id', $id)
            ->whereIn('status', ['confirmed', 'pending'])
            ->get(['date', 'status']);

        return response()->json([
            'availabilities' => $availabilities,
            'bookings' => $bookings
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'entity_type' => 'required|in:hall,service',
            'entity_id' => 'required|integer',
            'date' => 'required|date',
            'is_available' => 'required|boolean',
        ]);

        $entityType = $validated['entity_type'] === 'hall' ? 'App\Models\Hall' : 'App\Models\Service';
        
        // Find the entity and check ownership
        $model = $validated['entity_type'] === 'hall' 
            ? Hall::findOrFail($validated['entity_id']) 
            : Service::findOrFail($validated['entity_id']);

        if ($model->owner_id !== $request->user()->id && $request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $availability = Availability::updateOrCreate(
            [
                'entity_type' => $entityType,
                'entity_id' => $validated['entity_id'],
                'date' => $validated['date'],
            ],
            [
                'owner_id' => $request->user()->id,
                'is_available' => $validated['is_available'],
            ]
        );

        return response()->json($availability);
    }
}
