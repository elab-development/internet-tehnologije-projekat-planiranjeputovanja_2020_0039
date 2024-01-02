<?php

namespace app\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\DB;

use Laravel\Sanctum\Sanctum;

class AuthController extends Controller
{
    
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:2'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'name'=> $request->name,
            'email'=> $request->email,
            
            'password' => bcrypt($request->password),

            
        ]);

        $tokenResult = $user->createToken('auth_token');

        $token = $tokenResult->accessToken;
    
        return response()->json(['token' => $token], 201);

            }

    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
    
        $user = Auth::user();
    
        $tokenResult = $user->createToken('auth_token');
        $token = $tokenResult->accessToken;
    
        return response()->json(['token' => $token], 201);
    }
    

    public function logout(Request $request)
    {
        $user = auth()->user();
        
            if ($user) {
                DB::table('personal_access_tokens')->where('tokenable_id', $user->id)->delete();
                return response()->json(['message' => 'Successfully logged out!']);
            } else {
                return response()->json(['message' => 'User not authenticated.'], 401);
            }
        }
    }
    
    



