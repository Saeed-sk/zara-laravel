<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Basket;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BasketController extends Controller
{
    public function getFullBasket(Request $request): JsonResponse
    {
        $basket = Basket::query()->where('user_id', $request->user()->id)->where('payment_status', 'unpaid')->with('products')->get();
        return response()->json($basket, 200);
    }

    public function createFullBasket(Request $request)
    {
        $basket = Basket::query()->where('user_id', 2)->where('payment_status', 'unpaid')->first();

        if (empty($basket)) {
            $basket = new Basket();
            $basket->user_id = 2;
            $basket->total_price = $request['total_price'];
            $basket->save();
        }
        $products = $request['products'];
        foreach ($products as $product) {
            $basket->products()->attach($product['id'], [
                'color_id' => $product['color_id'],
                'size_id' => $product['size_id'],
                'quantity' => $product['quantity']
            ]);
        }
        return response()->json($basket, 200);
    }

    public function deleteFullBasket(Request $request)
    {
        $basket = Basket::query()->where('user_id', 2)->where('payment_status', 'unpaid')->first();
        if (empty($basket)) {
            return response()->json(['error' => 'سبد خرید یافت نشد'], 404);
        } else {
            $basket->delete();
            return response()->json(['success' => 'سبد خرید با موفقیت حذف شد'], 404);
        }
    }

    public function addToBasket(Request $request)
    {
        $basket = Basket::query()->where('user_id', 2)->where('payment_status', 'unpaid')->first();
        $product = $request['product'];
        if (empty($basket)) {
            return response()->json(['error' => 'سبد خرید یافت نشد'], 404);
        } else {
            $basket->total_price = $request['total_price'];
            $basket->products()->attach($product['id'], [
                'color_id' => $request['color_id'],
                'size_id' => $request['size_id'],
                'quantity' => $request['quantity']
            ]);
            return response()->json($basket, 200);
        }
    }

    public function removeFromBasket(Request $request)
    {
        $basket = Basket::query()->where('user_id', 2)->where('payment_status', 'unpaid')->first();
        $product = $request['product'];
        if (empty($basket)) {
            return response()->json(['error' => 'سبد خرید یافت نشد'], 404);
        } else {
            $basket->total_price = $request['total_price'];
            $basket->products()->detach($product['id'], [
                'color_id' => $request['color_id'],
                'size_id' => $request['size_id'],
                'quantity' => $request['quantity']
            ]);
            return response()->json($basket, 200);
        }
    }
}
