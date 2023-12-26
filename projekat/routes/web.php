<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

use App\Http\Controllers\AttractionController;

Route::get('/attractions', [AttractionController::class, 'index']);
Route::get('/attractions/{id}', [AttractionController::class, 'show']);
// Dodajte i druge rute za ostale akcije po potrebi: create, store, edit, update, delete...



Route::get('/', function () {
    return view('welcome');
});

use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;

// Ruta za registraciju korisnika
Route::post('/register', [RegisterController::class, 'register']);

// Ruta za prijavu korisnika
Route::post('/login', [LoginController::class, 'login']);

// Ruta za odjavu korisnika
Route::post('/logout', [LogoutController::class, 'logout']);

