<?php

use App\Http\Controllers\admin\DashboardController;
use App\Http\Controllers\admin\EventController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\StripePaymentController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

//------- not protected route ------//
// login 
Route::post('auth', [AuthController::class, 'authenticate']);
// register
Route::post('register', [AuthController::class, 'makeRegister']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    // Protected Routes
    Route::get('dashboard', [DashboardController::class, 'index']);

    // logout 
    Route::post('logout', [AuthController::class, 'logout']);
});

// admin routes 
Route::group(['middleware' => ['auth:sanctum', 'admin']], function () {
    Route::post('admin/events', [EventController::class, 'store']);
    Route::get('admin/events', [EventController::class, 'index']);
    Route::get('admin/allevents', [EventController::class, 'allEvents']);
    Route::get('admin/event-categories', [EventController::class, 'categories']);
    Route::get('admin/events/{id}', [EventController::class, 'show']);
    Route::put('admin/events/{event}', [EventController::class, 'update']);

    Route::delete('admin/events/{id}', [EventController::class, 'eventDestroy']);

    // get all users 
    Route::get('admin/users', [UserController::class, 'allUsers']);
    Route::delete('admin/users/{id}', [UserController::class, 'destroy']);

    // payment 
    Route::post('create-checkout-session', [StripePaymentController::class, 'createCheckoutSession']);
    Route::get('my-payments', [StripePaymentController::class, 'getUserPayments']);
    Route::get('payments', [StripePaymentController::class, 'getAllPayments']);
    Route::delete('my-payments/{id}', [StripePaymentController::class, 'destroy']);

});

Route::group(['middleware' => ['auth:sanctum']], function () {
    // payment 
    Route::post('create-checkout-session', [StripePaymentController::class, 'createCheckoutSession']);
    Route::get('my-payments', [StripePaymentController::class, 'getUserPayments']);
    Route::get('payments', [StripePaymentController::class, 'getAllPayments']);
    Route::delete('my-payments/{id}', [StripePaymentController::class, 'destroy']);

    Route::post('store-purchase', [PurchaseController::class, 'store']);
    Route::get('my-purchases', [PurchaseController::class, 'myPurchases']);


});

// public route 
Route::get('events', [EventController::class, 'index']);
Route::get('event-cate', [EventController::class, 'categories']);
Route::get('events/{id}', [EventController::class, 'show']);

// payment routes 


Route::get('/payment-success', [StripePaymentController::class, 'paymentSuccess']);