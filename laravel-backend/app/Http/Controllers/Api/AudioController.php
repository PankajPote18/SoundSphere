<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Audio;
use Illuminate\Http\Request;

class AudioController extends Controller
{
    public function index()
    {
        return response()->json(Audio::all());
    }

    public function show($id)
    {
        $audio = Audio::find($id);
        if (!$audio) return response()->json(['message' => 'Audio not found'], 404);
        return response()->json($audio);
    }

    public function store(Request $request)
    {
        $audio = Audio::create($request->all());
        return response()->json($audio, 201);
    }

    public function update(Request $request, $id)
    {
        $audio = Audio::find($id);
        if (!$audio) return response()->json(['message' => 'Audio not found'], 404);
        $audio->update($request->all());
        return response()->json($audio);
    }

    public function destroy($id)
    {
        $audio = Audio::find($id);
        if (!$audio) return response()->json(['message' => 'Audio not found'], 404);
        $audio->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}
