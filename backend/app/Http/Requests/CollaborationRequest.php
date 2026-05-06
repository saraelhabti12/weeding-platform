<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CollaborationRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'hall_id' => 'required|exists:halls,id',
            'service_id' => 'required|exists:services,id',
        ];
    }
}
