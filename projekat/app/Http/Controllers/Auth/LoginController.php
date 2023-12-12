<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        dd('Debugging...');
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            return response()->json(['message' => 'Uspešna prijava', 'user' => $user], 200);
        } else {
            return response()->json(['message' => 'Neuspešna prijava'], 401);
        }
    }
}

