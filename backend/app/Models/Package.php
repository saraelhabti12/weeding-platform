<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Package extends Model
{
    use HasFactory;

    protected $fillable = [
        'hall_id',
        'name',
        'description',
        'price',
    ];

    public function hall()
    {
        return $this->belongsTo(Hall::class);
    }
}
