<?php

namespace App\Http\Controllers;

use App\Models\Purchase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PurchaseController extends Controller
{

    public function myPurchases(Request $request)
    {
        try {
            $user = Auth::user();

            if (!$user) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            $purchases = Purchase::where('user_id', $user->id)
                ->latest()
                ->get();

            return response()->json([
                'purchases' => $purchases
            ]);
        } catch (\Exception $e) {
            \Log::error('Failed to fetch purchases: ' . $e->getMessage());
            return response()->json(['error' => 'Server Error'], 500);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'event_id' => 'required|exists:events,id',
            'title' => 'required',
            'price' => 'required|numeric',
            'image_path' => 'nullable|string',
            'user_id' => 'required|exists:users,id',
        ]);

        $purchase = Purchase::create([
            'event_id' => $validated['event_id'],
            'title' => $validated['title'],
            'price' => $validated['price'],
            'image_path' => $validated['image_path'],
            'user_id' => $validated['user_id'],
            'is_paid' => false, // initially unpaid
        ]);

        return response()->json(['purchase' => $purchase], 201);
    }

}
