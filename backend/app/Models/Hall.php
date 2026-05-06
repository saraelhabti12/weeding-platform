<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Hall extends Model
{
    use HasFactory;

    protected $fillable = [
        'owner_id',
        'name',
        'description',
        'price',
        'capacity',
        'lat',
        'lng',
    ];

    protected $casts = [];

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function packages()
    {
        return $this->hasMany(Package::class);
    }

    public function availabilities()
    {
        return $this->morphMany(Availability::class, 'entity');
    }

    public function collaborations()
    {
        return $this->hasMany(Collaboration::class);
    }

    public function acceptedCollaborations()
    {
        return $this->hasMany(Collaboration::class)->where('status', 'accepted');
    }

    public function bookings()
    {
        return $this->morphMany(Booking::class, 'entity');
    }

    public function reviews()
    {
        return $this->morphMany(Review::class, 'reviewable');
    }
}
