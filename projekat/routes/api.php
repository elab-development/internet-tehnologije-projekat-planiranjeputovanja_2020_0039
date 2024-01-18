<?php

use Illuminate\Support\Facades\Route;

use Illuminate\Http\Request;

use Laravel\Sanctum\Sanctum;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Auth\FrogotPasswordController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\TravelTermController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\AttractionController;

//resurs ruta// napraviti resurs
Route::resource('travel-terms', TravelTermController::class);


//ATRAKCIJE
Route::get('/attractions', [AttractionController::class, 'index']);

Route::get('/attractions/{id}', [AttractionController::class, 'show']);

Route::post('/attractions', [AttractionController::class, 'store']);

Route::put('/attractions/{id}', [AttractionController::class, 'update']);

Route::delete('/attractions/{id}', [AttractionController::class, 'destroy']);




//PRIJAVA
Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);


Route::middleware(['auth:sanctum'])->group(function () {
  Route::post('/logout', [AuthController::class, 'logout']);
});




/*Route::middleware(['auth:sanctum'])->group(function () {
 Route::post('/countries', [CountryController::class, 'store']);
 Route::post('/cities', [CityController::class, 'store']);
 Route::post('/attractions', [AttractionController::class, 'store']);
  
});*/


// CITY
Route::get('/cities', [CityController::class, 'index']);
Route::get('/cities/{id}', [CityController::class, 'show']);
Route::post('/cities', [CityController::class, 'store']);
Route::put('/cities/{id}', [CityController::class, 'update']);
Route::delete('/cities/{id}', [CityController::class, 'destroy']);

Route::get('/cities/{countryId}', [CityController::class, 'getCitiesByCountry']);

// COUNTRY
Route::get('/countries', [CountryController::class, 'index']);
Route::get('/countries/{id}', [CountryController::class, 'show']);
Route::post('/countries', [CountryController::class, 'store']);
Route::put('/countries/{id}', [CountryController::class, 'update']);
Route::delete('/countries/{id}', [CountryController::class, 'destroy']);

// TRAVEL TERM
Route::get('/travel-terms', [TravelTermController::class, 'index']);
Route::get('/travel-terms/{id}', [TravelTermController::class, 'show']);
Route::post('/travel-terms', [TravelTermController::class, 'store']);
Route::put('/travel-terms/{id}', [TravelTermController::class, 'update']);
Route::delete('/travel-terms/{id}', [TravelTermController::class, 'destroy']);

// USER
Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::post('/users', [UserController::class, 'store']);
Route::put('/users/{id}', [UserController::class, 'update']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{user_id}', [UserController::class, 'show']);


//RUTE ZA PROMENU LOZINKE


Route::get('/reset-lozinke', 'Auth\ForgotPasswordController@showLinkRequestForm')->name('password.request');
Route::post('/posalji-link-za-reset', 'Auth\ForgotPasswordController@sendResetLinkEmail')->name('password.email');
Route::get('/reset-lozinke/{token}', 'Auth\ResetPasswordController@showResetForm')->name('password.reset');
Route::post('/izvrsi-reset-lozinke', 'Auth\ResetPasswordController@reset')->name('password.update');




