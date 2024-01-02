<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;

class Authenticate extends Middleware
{
  
    protected function redirectTo(Request $request): ?string
    {
        return $request->expectsJson() ? null : route('login');
    }

    public function handle($request, Closure $next, ...$guards)
    {
        
        return (new EnsureFrontendRequestsAreStateful())->handle($request, function ($request) use ($next) {
            return $next($request);
        });

        
        return $response;
    }
}
