<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Availability extends Model
{
    use HasFactory;

    protected $fillable = [
        'owner_id',
        'entity_type',
        'entity_id',
        'date',
        'is_available',
    ];

    protected $casts = [
        'date' => 'date',
        'is_available' => 'boolean',
    ];

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function entity()
    {
        return $this->morphTo();
    }
}
