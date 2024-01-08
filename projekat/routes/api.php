<?php

use Illuminate\Support\Facades\Route;

use Illuminate\Http\Request;

use Laravel\Sanctum\Sanctum;



use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\TravelTermController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\AttractionController;
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

//Sanctum::routes();

Route::get('/attractions', [AttractionController::class, 'index']);
Route::get('/attractions/{id}', [AttractionController::class, 'show']);



Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);


Route::middleware(['auth:sanctum'])->group(function () {
  Route::post('/logout', [AuthController::class, 'logout']);
});





Route::apiResource('posts', PostController::class)->middleware('auth:sanctum');



Route::get('/cities', [CityController::class, 'index']);

Route::middleware(['auth:sanctum'])->group(function () {
 Route::post('/addcountries', [CountryController::class, 'store']);
 Route::post('/addcities', [CityController::class, 'store']);
 Route::post('/addattractions', [AttractionController::class, 'store']);
  
});





Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{user_id}', [UserController::class, 'show']);

Route::delete('/countries/{id}', [CountryController::class, 'destroy']);
