<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HallController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\CollaborationController;

use App\Http\Controllers\AvailabilityController;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/halls', [HallController::class, 'index']);
Route::get('/halls/{hall}', [HallController::class, 'show']);

Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{service}', [ServiceController::class, 'show']);

Route::get('/availability/{type}/{id}', [AvailabilityController::class, 'index']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::post('/availability', [AvailabilityController::class, 'store']);

    Route::get('/user/bookings', [BookingController::class, 'index']);
    Route::apiResource('bookings', BookingController::class)->except(['index']);
    
    Route::middleware('role:vendor')->group(function () {
        Route::post('/halls', [HallController::class, 'store']);
        Route::put('/halls/{hall}', [HallController::class, 'update']);
        Route::delete('/halls/{hall}', [HallController::class, 'destroy']);
        Route::put('/halls/{hall}/availability', [HallController::class, 'updateAvailability']);
        
        Route::post('/services', [ServiceController::class, 'store']);
        Route::put('/services/{service}', [ServiceController::class, 'update']);
        Route::delete('/services/{service}', [ServiceController::class, 'destroy']);
        Route::put('/services/{service}/availability', [ServiceController::class, 'updateAvailability']);
    });

    Route::middleware('role:admin')->group(function () {
        Route::put('/halls/{hall}/status', [HallController::class, 'updateStatus']);
        Route::put('/services/{service}/status', [ServiceController::class, 'updateStatus']);
        Route::put('/users/{user}/status', [AuthController::class, 'updateUserStatus']);
    });
    
    Route::apiResource('collaborations', CollaborationController::class)->only(['index', 'store', 'update']);
    
    Route::post('/reviews', [ReviewController::class, 'store']);
});

// Review list for a hall (public)
Route::get('/halls/{hall}/reviews', [ReviewController::class, 'index']);
