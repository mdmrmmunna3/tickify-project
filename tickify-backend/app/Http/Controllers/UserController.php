<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // Get all customers
    public function allUsers()
    {
        $users = User::where('role', 'customer')->get();

        return response()->json([
            'status' => true,
            'message' => 'User or customer Data fetch Successfully!',
            'users' => $users
        ], 200);
    }

    // Delete a customer user
    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        \Log::info("Deleting user: ID {$user->id}, Role: ");

        $user->delete();

        return response()->json([
            'status' => true,
            'message' => 'User deleted successfully!',
        ], 200);
    }

}
