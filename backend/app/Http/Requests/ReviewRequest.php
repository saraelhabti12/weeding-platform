<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReviewRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'reviewable_id' => 'required|integer',
            'reviewable_type' => 'required|string|in:App\Models\Hall,App\Models\Service',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string',
        ];
    }
}
