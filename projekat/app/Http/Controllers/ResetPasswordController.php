<?php

// app/Http/Controllers/ResetPasswordController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;

class ResetPasswordController extends Controller
{
    public function sendResetLinkEmail(Request $request)
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

        $response = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
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
