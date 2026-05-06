<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Hall;
use App\Models\Service;
use App\Http\Requests\BookingRequest;
use Illuminate\Http\Request;
use Carbon\Carbon;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        return $request->user()->bookings()->with('entity')->get();
    }

    public function store(BookingRequest $request)
    {
        $entityType = $request->entity_type === 'hall' ? 'App\Models\Hall' : 'App\Models\Service';
        $entityId = $request->entity_id;
        $date = $request->date;

        $model = $request->entity_type === 'hall' 
            ? Hall::findOrFail($entityId) 
            : Service::findOrFail($entityId);

        // 1. Check if the date is available (must be explicitly marked as available)
        $availability = $model->availabilities()
            ->where('date', $date)
            ->first();

        if (!$availability || !$availability->is_available) {
            return response()->json(['message' => 'The selected date is not available or blocked.'], 422);
        }

        // 2. Check if already booked
        $existingBooking = Booking::where('entity_type', $entityType)
            ->where('entity_id', $entityId)
            ->where('date', $date)
            ->whereIn('status', ['pending', 'confirmed'])
            ->exists();

        if ($existingBooking) {
            return response()->json(['message' => 'The selected date is already booked.'], 422);
        }

        $booking = $request->user()->bookings()->create([
            'entity_type' => $entityType,
            'entity_id' => $entityId,
            'date' => $date,
            'status' => 'pending',
        ]);

        return response()->json($booking->load('entity'), 201);
    }

    public function show(Booking $booking, Request $request)
    {
        if ($request->user()->id !== $booking->user_id && $request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return $booking->load('entity');
    }

    public function update(Request $request, Booking $booking)
    {
        // For vendor to approve/reject or customer to cancel
        // Assuming vendor owns the entity
        $user = $request->user();
        $isOwner = false;
        
        if ($booking->entity_type === 'App\Models\Hall') {
            $isOwner = $booking->entity->owner_id === $user->id;
        } else {
            $isOwner = $booking->entity->owner_id === $user->id;
        }

        if ($user->id !== $booking->user_id && !$isOwner && $user->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $booking->update($request->only('status'));

        return response()->json($booking);
    }

    public function destroy(Booking $booking, Request $request)
    {
        if ($request->user()->id !== $booking->user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $booking->delete();

        return response()->json(['message' => 'Booking cancelled successfully']);
    }
}
