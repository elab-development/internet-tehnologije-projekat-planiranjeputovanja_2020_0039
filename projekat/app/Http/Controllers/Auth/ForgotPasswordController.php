<?php
// app/Http/Controllers/Auth/ForgotPasswordController.php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;

class ForgotPasswordController extends Controller
{
    use SendsPasswordResetEmails;

    // Opciono: Podesite putanju na koju će korisnik biti preusmeren nakon uspešnog slanja e-maila
    protected $redirectTo = '/';

    public function __construct()
    {
        $this->middleware('guest');
    }
}

