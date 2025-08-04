<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{

    public function makeRegister(Request $request)
    {
        if (User::where('email', $request->email)->exists()) {
            return response()->json([
                'status' => false,
                'error' => 'Email already exists.'
            ], 409);
        }

        $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'role' => 'customer',
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('token')->plainTextToken;

        return response()->json([
            'status' => true,
            'token' => $token,
            'role' => $user->role,
            'id' => $user->id,
            'message' => "User Registered Successfully!"
        ], 201);
    }


    // login method 
    public function authenticate(Request $request)
    {
        // applying validation
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        // check request fails conditon 
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        } else {

            $credentials = [
                'email' => $request->email,
                'password' => $request->password
            ];

            if (Auth()->attempt($credentials)) {

                $user = User::find(Auth()->user()->id);

                $token = $user->createToken('token')->plainTextToken;

                return response()->json([
                    'status' => true,
                    'token' => $token,
                    'id' => Auth()->user()->id,
                    'role' => $user->role,
                    'message' => "Log In Successfully!"
                ]);

            } else {
                return response()->json([
                    'status' => false,
                    'message' => "Email or Password is Incorrect!"
                ]);
            }
        }
    }

    // logout 
    public function logout()
    {
        $user = User::find(Auth()->user()->id);
        $user->tokens()->delete();

        return response()->json([
            'status' => true,
            'message' => "Logout Successfully!"
        ]);
    }
}
