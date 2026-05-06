<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class HallRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string',
            'capacity' => 'required|integer',
            'price' => 'required|numeric',
            'lat' => 'nullable|numeric',
            'lng' => 'nullable|numeric',
            'city' => 'nullable|string',
            'images' => 'nullable|array',
            'amenities' => 'nullable|array',
        ];
    }
}
