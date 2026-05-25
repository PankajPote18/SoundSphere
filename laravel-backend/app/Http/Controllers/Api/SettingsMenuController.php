<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SettingsMenu;
use Illuminate\Http\Request;

class SettingsMenuController extends Controller
{
    /**
     * Return all menu items ordered by sort_order.
     * Optionally filter to only active items: ?active=1
     */
    public function index(Request $request)
    {
        $query = SettingsMenu::orderBy('sort_order');

        if ($request->boolean('active')) {
            $query->where('status', true);
        }

        return response()->json($query->get());
    }

    public function show($id)
    {
        $item = SettingsMenu::find($id);
        if (!$item) {
            return response()->json(['message' => 'Not found'], 404);
        }
        return response()->json($item);
    }

    public function store(Request $request)
    {
        $item = SettingsMenu::create($request->all());
        return response()->json($item, 201);
    }

    public function update(Request $request, $id)
    {
        $item = SettingsMenu::find($id);
        if (!$item) {
            return response()->json(['message' => 'Not found'], 404);
        }
        $item->update($request->all());
        return response()->json($item);
    }

    public function destroy($id)
    {
        $item = SettingsMenu::find($id);
        if (!$item) {
            return response()->json(['message' => 'Not found'], 404);
        }
        $item->delete();
        return response()->json(['message' => 'Deleted']);
    }

    /**
     * Bulk reorder: PATCH /api/settings-menu/reorder
     * Body: { "items": [{ "id": 1, "sort_order": 0 }, ...] }
     */
    public function reorder(Request $request)
    {
        foreach ($request->input('items', []) as $entry) {
            SettingsMenu::where('id', $entry['id'])->update(['sort_order' => $entry['sort_order']]);
        }
        return response()->json(['message' => 'Reordered']);
    }
}
