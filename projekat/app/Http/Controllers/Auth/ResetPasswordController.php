<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use App\Models\User;

class ResetPasswordController extends Controller
{
    public function sendResetLink(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $response = Password::sendResetLink($request->only('email'));

        return $response == Password::RESET_LINK_SENT
            ? response()->json(['message' => 'E-pošta sa linkom za resetovanje lozinke poslata.'])
            : response()->json(['error' => 'Došlo je do greške pri slanju e-pošte.'], 500);
    }

    public function reset(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'token' => 'required',
            'password' => 'required|confirmed|min:8',
        ]);

        $credentials = $request->only('email', 'password', 'password_confirmation', 'token');

        // Pronađi korisnika na osnovu e-mail adrese
        $user = User::where('email', $credentials['email'])->first();

        if (!$user){
            return response()->json(['error' => 'Korisnik sa datom e-poštom nije pronađen.'], 404);
        }

        $response = Password::reset(
            $credentials,
            function ($user, $password) {
                $user->forceFill([
                    'password' => bcrypt($password),
                    'remember_token' => Str::random(60),
                ])->save();
            }
        );

        return $response == Password::PASSWORD_RESET
            ? response()->json(['message' => 'Lozinka uspešno resetovana.'])
            : response()->json(['error' => 'Došlo je do greške pri resetovanju lozinke.'], 500);
    }
}
