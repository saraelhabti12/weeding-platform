<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Hall;
use App\Http\Requests\ReviewRequest;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index(Request $request, $hallId)
    {
        return Review::where('reviewable_id', $hallId)
            ->where('reviewable_type', Hall::class)
            ->with('user')
            ->latest()
            ->get();
    }

    public function store(ReviewRequest $request)
    {
        $review = $request->user()->reviews()->create($request->validated());

        return response()->json($review, 201);
    }
}
