<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/',function (){
    return Inertia::render('Welcome');
});
Route::middleware('auth', \App\Http\Middleware\EnsureUserIsAdmin::class)->group(function () {
    Route::prefix('admin')->group(function () {
        Route::get('/', function () {
            return Inertia::render('Dashboard');
        })->name('admin');

        Route::controller(\App\Http\Controllers\Admin\CategoriesController::class)->group(function () {
            Route::get('/category', 'index')->name('admin.category');
            Route::post('/category/create', 'create')->name('admin.category.create');
            Route::post('/category/update', 'update')->name('admin.category.update');
            Route::post('/category/delete', 'destroy')->name('admin.category.delete');
            Route::get('/category/parent', 'parent')->name('admin.category.parent');
        });

        Route::controller(\App\Http\Controllers\Admin\BannersController::class)->group(function () {
            Route::get('/banners', 'index')->name('admin.banners');
            Route::post('/banners/create', 'create')->name('admin.banners.create');
            Route::post('/banners/update', 'update')->name('admin.banners.update');
            Route::post('/banners/delete', 'destroy')->name('admin.banners.delete');
        });

        Route::controller(\App\Http\Controllers\Admin\AttributeController::class)->group(function () {
            Route::post('/attribute/store', 'create')->name('admin.attribute.store');
            Route::post('/attribute/delete', 'destroy')->name('admin.attribute.delete');
            Route::post('/attribute/update', 'update')->name('admin.attribute.update');
        });

        Route::controller(\App\Http\Controllers\Admin\ColorsController::class)->group(function () {
            Route::post('/color/store', 'create')->name('admin.color.store');
            Route::post('/color/delete', 'destroy')->name('admin.color.delete');
            Route::post('/color/update', 'update')->name('admin.color.update');
        });

        Route::controller(\App\Http\Controllers\Admin\SizesController::class)->group(function () {
            Route::post('/size/store', 'create')->name('admin.size.store');
            Route::post('/size/delete', 'destroy')->name('admin.size.delete');
            Route::post('/size/update', 'update')->name('admin.size.update');
        });

        Route::controller(\App\Http\Controllers\Admin\ProductsController::class)->group(function () {
            Route::get('/single-products', 'singleIndex')->name('admin.singleProducts');
            Route::get('/collection-products', 'collectionIndex')->name('admin.collectionProducts');
            Route::post('/products/store', 'create')->name('admin.products.store');
            Route::post('/products/delete', 'destroy')->name('admin.products.delete');
            Route::post('/products/update', 'update')->name('admin.products.update');
            Route::get('/products/search', 'search')->name('admin.products.search');
        });

        Route::controller(\App\Http\Controllers\Admin\LiraPriceController::class)->group(function () {
            Route::get('/price', 'index')->name('admin.get.price');
            Route::post('/price/update', 'updateOrCreate')->name('admin.price.update');
        });

        Route::controller(\App\Http\Controllers\Admin\ImagesControllers::class)->group(function () {
            Route::post('/singleImage/delete', 'destroy')->name('admin.singleImage.delete');
        });

        Route::controller(\App\Http\Controllers\Admin\AdminMainController::class)->group(function () {
            Route::get('/attributes', 'getAttributes')->name('admin.attributes');
            Route::get('/allAttributeWithCategory', 'getAllAttributeWithCategory')->name('admin.get-all-attribute-with-category');
            Route::get('/collection/search', 'searchCollection')->name('admin.collection.Search');
        });


    });

});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
