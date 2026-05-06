<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BookingRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'entity_type' => 'required|in:hall,service',
            'entity_id' => 'required|integer',
            'date' => 'required|date|after_or_equal:today',
        ];
    }
}
