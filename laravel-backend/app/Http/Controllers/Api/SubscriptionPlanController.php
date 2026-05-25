<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SubscriptionPlan;
use Illuminate\Http\Request;

class SubscriptionPlanController extends Controller
{
    /**
     * Return all plans ordered by sort_order.
     * Optionally filter to only active: ?active=1
     */
    public function index(Request $request)
    {
        $query = SubscriptionPlan::orderBy('sort_order');

        if ($request->boolean('active')) {
            $query->where('status', true);
        }

        return response()->json($query->get());
    }

    public function show($id)
    {
        $plan = SubscriptionPlan::find($id);
        if (!$plan) {
            return response()->json(['message' => 'Not found'], 404);
        }
        return response()->json($plan);
    }

    public function store(Request $request)
    {
        $plan = SubscriptionPlan::create($request->all());
        return response()->json($plan, 201);
    }

    public function update(Request $request, $id)
    {
        $plan = SubscriptionPlan::find($id);
        if (!$plan) {
            return response()->json(['message' => 'Not found'], 404);
        }
        $plan->update($request->all());
        return response()->json($plan);
    }

    public function destroy($id)
    {
        $plan = SubscriptionPlan::find($id);
        if (!$plan) {
            return response()->json(['message' => 'Not found'], 404);
        }
        $plan->delete();
        return response()->json(['message' => 'Deleted']);
    }

    /**
     * Toggle status only: PATCH /api/subscription-plans/{id}/toggle
     */
    public function toggle($id)
    {
        $plan = SubscriptionPlan::find($id);
        if (!$plan) {
            return response()->json(['message' => 'Not found'], 404);
        }
        $plan->update(['status' => !$plan->status]);
        return response()->json($plan);
    }
}
