<?php

use Illuminate\Support\Facades\Route;

use Illuminate\Http\Request;

use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;



use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\TravelTermController;
use App\Http\Controllers\API\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//Route::apiResource('countries', CountryController::class);



// Rute za autentifikaciju

/*Route::put('users/{id}', [UserController::class, 'update'])->middleware('auth:sanctum');
Route::delete('users/{id}', [UserController::class, 'destroy'])->middleware('auth:sanctum');
*/


Route::post('/register', [AuthController::class, 'register']);

Route::apiResource('posts', PostController::class)->middleware('auth:sanctum');



// Dodatne rute 



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{user_id}', [UserController::class, 'show']);


