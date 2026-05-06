<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Collaboration extends Model
{
    use HasFactory;

    protected $fillable = [
        'hall_id',
        'service_id',
        'status',
    ];

    public function hall()
    {
        return $this->belongsTo(Hall::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}
