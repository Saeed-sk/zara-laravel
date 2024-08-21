<?php

use App\Http\Controllers\Api\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Api\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Api\Auth\NewPasswordController;
use App\Http\Controllers\Api\Auth\PasswordResetLinkController;
use App\Http\Controllers\Api\Auth\RegisteredUserController;
use App\Http\Controllers\Api\Auth\VerifyEmailController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('guest')->group(function () {

    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store']);

    Route::post('reset-password', [NewPasswordController::class, 'store']);

});

Route::middleware('auth')->group(callback: function () {
    Route::get('verify-email', EmailVerificationPromptController::class);

    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1']);

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1');

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy']);
});
// api landing page
Route::get('/categories', [\App\Http\Controllers\Api\CategoriesController::class, 'index']);
// api for products
Route::get('/products', [\App\Http\Controllers\Api\ProductsController::class, 'getProductByCategory']);
Route::get('/products/attrs', [\App\Http\Controllers\Api\ProductsController::class, 'getProductsAttrs']);
Route::get('/product', [\App\Http\Controllers\Api\ProductsController::class, 'getSingleProduct']);
// search in products
Route::get('/search/items', [\App\Http\Controllers\Api\SearchProductsController::class, 'index']);
Route::get('/search/query', [\App\Http\Controllers\Api\SearchProductsController::class, 'search']);
