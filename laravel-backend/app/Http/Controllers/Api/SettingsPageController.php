<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SettingsPage;
use Illuminate\Http\Request;

class SettingsPageController extends Controller
{
    public function index()
    {
        $pages = SettingsPage::all();
        return response()->json($pages);
    }

    public function show($id)
    {
        $page = SettingsPage::findOrFail($id);
        return response()->json($page);
    }

    public function showBySlug($slug)
    {
        $page = SettingsPage::where('slug', $slug)->firstOrFail();
        return response()->json($page);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:settings_pages',
            'short_description' => 'nullable|string',
            'full_content' => 'nullable|string',
            'status' => 'boolean',
        ]);

        $page = SettingsPage::create($validated);
        return response()->json($page, 201);
    }

    public function update(Request $request, $id)
    {
        $page = SettingsPage::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'slug' => 'sometimes|required|string|max:255|unique:settings_pages,slug,' . $page->id,
            'short_description' => 'nullable|string',
            'full_content' => 'nullable|string',
            'status' => 'boolean',
        ]);

        $page->update($validated);
        return response()->json($page);
    }

    public function destroy($id)
    {
        $page = SettingsPage::findOrFail($id);
        $page->delete();
        return response()->json(['message' => 'Page deleted successfully']);
    }
}
