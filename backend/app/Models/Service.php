<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'owner_id',
        'category',
        'price',
        'lat',
        'lng',
    ];

    protected $casts = [];

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function collaborations()
    {
        return $this->hasMany(Collaboration::class);
    }

    public function reviews()
    {
        return $this->morphMany(Review::class, 'reviewable');
    }

    public function bookings()
    {
        return $this->morphMany(Booking::class, 'entity');
    }

    public function availabilities()
    {
        return $this->morphMany(Availability::class, 'entity');
    }
}
