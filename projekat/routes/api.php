<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use Laravel\Passport\Token;
use App\Http\Controllers\UserController;

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

Route::apiResource('countries', CountryController::class);

// Rute za autentifikaciju
Route::post('register', 'AuthController@register');
Route::post('login', 'AuthController@login');


// Dodatne rute (primer za gradove)
Route::get('cities/popular', 'CityController@getPopular');
Route::get('cities/{id}/attractions', 'CityController@getAttractions');
Route::post('travel-terms/search', 'TravelTermController@search');

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{user_id}', [UserController::class, 'show']);

/*Route::middleware('auth:api')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
});*/
