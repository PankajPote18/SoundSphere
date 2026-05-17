<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Movie;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    public function index(Request $request)
    {
        $query = Movie::query();

        if ($request->has('search')) {
            $search = strtolower($request->input('search'));
            $query->where('title', 'LIKE', "%{$search}%")
                  ->orWhere('description', 'LIKE', "%{$search}%")
                  ->orWhere('cast', 'LIKE', "%{$search}%");
        }

        if ($request->has('category')) {
            $query->where('category_id', $request->input('category'));
        }

        return response()->json($query->get());
    }

    public function show($id)
    {
        $movie = Movie::find($id);

        if (!$movie) {
            return response()->json(['message' => 'Movie not found'], 404);
        }

        // Find related movies
        $related = Movie::where('id', '!=', $id)
            ->where('category_id', $movie->category_id)
            ->limit(10)
            ->get();

        $movieArray = $movie->toArray();
        $movieArray['related'] = $related;

        return response()->json($movieArray);
    }

    public function store(Request $request)
    {
        $movie = Movie::create($request->all());
        return response()->json($movie, 201);
    }

    public function update(Request $request, $id)
    {
        $movie = Movie::find($id);
        if (!$movie) {
            return response()->json(['message' => 'Movie not found'], 404);
        }

        $movie->update($request->all());
        return response()->json($movie);
    }

    public function destroy($id)
    {
        $movie = Movie::find($id);
        if (!$movie) {
            return response()->json(['message' => 'Movie not found'], 404);
        }
        
        $movie->delete();
        return response()->json(['message' => 'Movie deleted']);
    }
}
