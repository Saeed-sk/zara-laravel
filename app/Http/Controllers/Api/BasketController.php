<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Basket;
use App\Models\BasketProduct;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BasketController extends Controller
{
    public function getFullBasket(Request $request): JsonResponse
    {
        $basket = Basket::query()->where('user_id', auth()->user()->id)->where('payment_status', 'unpaid')->with('products')->first();
        return response()->json($basket, 200);
    }

    public function createFullBasket(Request $request): JsonResponse
    {
        $basket = Basket::query()->where('user_id', auth()->user()->id)->where('payment_status', 'unpaid')->first();

        if (empty($basket)) {
            $basket = new Basket();
            $basket->user_id = 2;
            $basket->total_price = $request['total_price'];
            $basket->save();
        }
        $products = $request['products'];
        foreach ($products as $product) {
            $basket->products()->attach($product['id'], [
                'color_id' => $product['color']['id'],
                'size_id' => $product['size']['id'],
                'quantity' => $product['quantity']
            ]);
        }
        return response()->json($basket, 200);
    }

    public function deleteFullBasket(Request $request):JsonResponse
    {
        $basket = Basket::query()->where('user_id',auth()->user()->id)->where('payment_status', 'unpaid')->first();
        if (empty($basket)) {
            return response()->json(['error' => 'سبد خرید یافت نشد'], 404);
        } else {
            $basket->delete();
            return response()->json(['success' => 'سبد خرید با موفقیت حذف شد'], 404);
        }
    }

    public function addToBasket(Request $request):JsonResponse
    {
        $basket = Basket::query()->where('user_id', auth()->user()->id)->where('payment_status', 'unpaid')->first();
        $product = $request['product'];
        if (empty($basket)) {
            $basket = new Basket();
            $basket->user_id = auth()->user()->id;
            $basket->total_price = $request['total_price'];
            $basket->save();
        } else {
            $basket->total_price = $request['total_price'];
        }
        $basket->products()->attach($product['id'], [
            'color_id' => $product['color']['id'],
            'size_id' => $product['size']['id'],
            'quantity' => $product['quantity']
        ]);
        return response()->json($basket, 200);
    }

    public function removeFromBasket(Request $request): JsonResponse
    {
        $basket = Basket::query()->where('user_id', auth()->user()->id)->where('payment_status', 'unpaid')->first();
        $product = $request['product'];
        if (empty($basket)) {
            return response()->json(['error' => 'سبد خرید یافت نشد'], 404);
        } else {
            $basket->total_price = $request['total_price'];
            BasketProduct::query()->where('basket_id', $basket->id)->where('product_id', $product['id'])->where('color_id', $product['color']['id'])->where('size_id', $product['size']['id'])->delete();
            return response()->json($basket, 200);
        }
    }
}
