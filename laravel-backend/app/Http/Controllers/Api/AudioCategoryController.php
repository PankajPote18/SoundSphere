<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AudioCategory;
use Illuminate\Http\Request;

class AudioCategoryController extends Controller
{
    public function index()
    {
        return response()->json(AudioCategory::all());
    }
}
