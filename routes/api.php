<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->post('/user', function (Request $request) {
    return $request->user();

});

Route::post('login', [\App\Http\Controllers\AuthController::class, 'login']);
Route::post('logout', [\App\Http\Controllers\AuthController::class, 'logout']);

Route::post('comments',[\App\Http\Controllers\CommentController::class, 'index']);
Route::post('comment/create', [\App\Http\Controllers\CommentController::class, 'create']);

Route::post('post/create', [\App\Http\Controllers\PostController::class, 'create']);
Route::post('posts', [\App\Http\Controllers\PostController::class, 'index']);
Route::post('post/update', [\App\Http\Controllers\PostController::class, 'update']);
Route::post('post/{id}', [\App\Http\Controllers\PostController::class, 'show']);
Route::post('post/delete/{id}', [\App\Http\Controllers\PostController::class, 'destroy']);

//Route::get('test', [App\Http\Controllers\UsersController::class, 'index']);
//
//Route::post('product/index', [\App\Http\Controllers\ProductController::class, 'index']);
//
//Route::post('product/create', [\App\Http\Controllers\ProductController::class, 'create']);

