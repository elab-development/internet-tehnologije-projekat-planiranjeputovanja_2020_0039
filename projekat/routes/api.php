<?php

use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\TravelTermController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\AttractionController;

// Resurs ruta za TravelTermController
Route::resource('travel-terms', TravelTermController::class);

// Atrakcije
Route::get('/attractions', [AttractionController::class, 'index']);
Route::get('/attractions/{id}', [AttractionController::class, 'show']);
Route::post('/attractions', [AttractionController::class, 'store']);
Route::put('/attractions/{id}', [AttractionController::class, 'update']);
Route::delete('/attractions/{id}', [AttractionController::class, 'destroy']);

// Prijava
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});

// Gradovi
Route::get('/cities', [CityController::class, 'index']);
Route::get('/cities/{id}', [CityController::class, 'show']);
Route::post('/cities', [CityController::class, 'store']);
Route::put('/cities/{id}', [CityController::class, 'update']);
Route::delete('/cities/{id}', [CityController::class, 'destroy']);
Route::get('/cities/{countryId}', [CityController::class, 'getCitiesByCountry']);

// Države
Route::get('/countries', [CountryController::class, 'index']);
Route::get('/countries/{id}', [CountryController::class, 'show']);
Route::post('/countries', [CountryController::class, 'store']);
Route::put('/countries/{id}', [CountryController::class, 'update']);
Route::delete('/countries/{id}', [CountryController::class, 'destroy']);

// Termin putovanja
Route::get('/travel-terms', [TravelTermController::class, 'index']);
Route::get('/travel-terms/{id}', [TravelTermController::class, 'show']);
Route::post('/travel-terms', [TravelTermController::class, 'store']);
Route::put('/travel-terms/{id}', [TravelTermController::class, 'update']);
Route::delete('/travel-terms/{id}', [TravelTermController::class, 'destroy']);

// Korisnici
Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::post('/users', [UserController::class, 'store']);
Route::put('/users/{id}', [UserController::class, 'update']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);

// Rute za promenu lozinke
Route::get('/reset-lozinke', [ForgotPasswordController::class, 'showLinkRequestForm'])->name('password.request');
Route::post('/posalji-link-za-reset', [ForgotPasswordController::class, 'sendResetLinkEmail'])->name('password.email');
Route::get('/reset-lozinke/{token}', [ResetPasswordController::class, 'showResetForm'])->name('password.reset');
Route::post('/izvrsi-reset-lozinke', [ResetPasswordController::class, 'reset'])->name('password.update');

// API rute za gradove i atrakcije
Route::get('/api/cities/{countryId}', [CityController::class, 'getCitiesByCountry']);
Route::get('/api/attractions/{cityId}', [AttractionController::class, 'getAttractionsByCity']);