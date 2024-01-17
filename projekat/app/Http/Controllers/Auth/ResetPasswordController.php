<?php

// app/Http/Controllers/Auth/ResetPasswordController.php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ResetsPasswords;

class ResetPasswordController extends Controller
{
    use ResetsPasswords;

    // Opciono: Podesite putanju na koju će korisnik biti preusmeren nakon uspešnog resetovanja lozinke
    protected $redirectTo = '/home';

    public function __construct()
    {
        $this->middleware('guest');
    }
}

