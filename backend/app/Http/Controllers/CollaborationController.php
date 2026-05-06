<?php

namespace App\Http\Controllers;

use App\Models\Collaboration;
use App\Http\Requests\CollaborationRequest;
use Illuminate\Http\Request;

class CollaborationController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        return Collaboration::with(['hall.owner', 'service.vendor'])
            ->whereHas('hall', function($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->orWhereHas('service', function($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->get();
    }

    public function store(CollaborationRequest $request)
    {
        $user = $request->user();
        
        // Ensure the user owns either the hall or the service
        $isHallOwner = \App\Models\Hall::where('id', $request->hall_id)->where('user_id', $user->id)->exists();
        $isServiceOwner = \App\Models\Service::where('id', $request->service_id)->where('user_id', $user->id)->exists();

        if (!$isHallOwner && !$isServiceOwner) {
            return response()->json(['message' => 'You must own either the hall or the service to initiate a collaboration.'], 403);
        }

        $collaboration = Collaboration::create([
            'hall_id' => $request->hall_id,
            'service_id' => $request->service_id,
            'status' => 'pending',
        ]);

        return response()->json($collaboration->load(['hall', 'service']), 201);
    }

    public function update(Request $request, Collaboration $collaboration)
    {
        $user = $request->user();
        
        // Verify if user is owner of the hall or the service
        $isHallOwner = $collaboration->hall->user_id === $user->id;
        $isServiceOwner = $collaboration->service->user_id === $user->id;

        if (!$isHallOwner && !$isServiceOwner) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'status' => 'required|in:accepted,rejected',
        ]);

        $collaboration->update(['status' => $request->status]);

        return response()->json($collaboration);
    }
}
