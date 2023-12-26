<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class AuthController extends Controller
{
    
public function register(Request $request){

    $validator = Validator::make($request->all(),[
        'name' => 'required|string|max:255',
        'email'=> 'required|string|email|max:255|unique:users',
        'password'=> 'required|string|min:2'
    ]);

    if($validator->false()){
        return response()->json($validator->errors());
    }

    $users = User::create([
        'name'=>$request->name,
        'email'=>$request->email,
        'password'=> Hash::make($request->password)
    ]);

    $token = $user-> createToken('auth_token')->plainTextToken;

    return respose()
    ->json(['data'=>$user,'access_token'=>$token, 'token_type'=>'Bearer', ]);

}



}
