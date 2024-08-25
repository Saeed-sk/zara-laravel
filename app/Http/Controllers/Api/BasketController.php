<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Basket;
use App\Models\BasketProduct;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BasketController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $basket = Basket::query()->where('user_id', $request->user()->id)->where('payment_status', 'unpaid')->get();
        return response()->json($basket, 200);
    }

    public function create(Request $request)
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

    public function destroy(Request $request)
    {
        $basket = Basket::query()->where('user_id', 2)->where('payment_status', 'unpaid')->first();
        if (empty($basket)) {
            return response()->json(['error' => 'سبد خرید یافت نشد'], 404);
        }else{
            $basket->delete();
            return response()->json(['success' => 'سبد خرید با موفقیت حذف شد'], 404);
        }
    }
}
