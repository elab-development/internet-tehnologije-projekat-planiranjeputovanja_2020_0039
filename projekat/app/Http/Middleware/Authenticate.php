<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */

     public function handle($request, Closure $next)
     {
         if (Auth::check()) {
             // Ako je korisnik prijavljen, preusmjeri ga na željenu rutu
             return redirect('/home');
         }
 
         return $next($request);
     }

    protected function redirectTo(Request $request): ?string
    {
        return $request->expectsJson() ? null : route('login');
    }
}
