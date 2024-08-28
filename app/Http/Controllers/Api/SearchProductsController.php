<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Colors;
use App\Models\Products;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SearchProductsController extends Controller
{
    public function index(): JsonResponse
    {
        $products = Products::query()->inRandomOrder()->take(10)->get();
        return response()->json($products);
    }

    public function search(Request $request): JsonResponse
    {
        $text = $request['query'];

        $searchProducts = Products::query()
            ->where('title', 'LIKE', "%{$text}%")
            ->orWhere('slug', 'LIKE', "%{$text}%")
            ->orWhereHas('colors', function ($query) use ($text) {
                $query->where('name', 'LIKE', "%{$text}%");
            })
            ->take(20)
            ->get();

        return response()->json($searchProducts);
    }
}
