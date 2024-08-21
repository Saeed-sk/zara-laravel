<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Categories;
use App\Models\Products;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
    public function getProductByCategory(Request $request): JsonResponse
    {
        $slug = $request->query('slug');
        $category = Categories::query()
            ->where('slug', $slug)
            ->with(['products' => function ($query) {
                $query->with(['attributes', 'colors', 'sizes', 'images', 'children']);
            }])
            ->first();

        if ($category) {
            $products = $category->products()->with(['attributes', 'colors', 'sizes', 'images', 'children'])->paginate(60);

            if ($products->count() > 0) {
                return response()->json([
                    'products' => $products->items(),
                    'pagination' => [
                        'total' => $products->total(),
                        'perPage' => $products->perPage(),
                        'currentPage' => $products->currentPage(),
                        'lastPage' => $products->lastPage(),
                        'from' => $products->firstItem(),
                        'to' => $products->lastItem(),
                    ],
                ]);
            } else {
                return response()->json(['error' => 'هیچ محصولی ثبت نشده'], 404);
            }
        } else {
            return response()->json(['error' => 'دسته‌بندی پیدا نشد'], 404);
        }
    }

    public function getProductsAttrs(Request $request): JsonResponse
    {
        $slug = $request->query('slug');
        $category = Categories::query()
            ->where('slug', $slug)
            ->with(['products' => function ($query) {
                $query->with(['attributes', 'colors', 'sizes', 'images', 'children']);
            }])
            ->first();

        if ($category && $category->products->count() > 0) {
            $prices = $category->products->pluck('price')->toArray();
            $min = (int)min($prices);
            $max = (int)max($prices);
            $allAttributes = $category->products->pluck('attributes')->unique('id')->flatten();
            $allColors = $category->products->pluck('colors')->unique('id')->flatten();
            $allSizes = $category->products->pluck('sizes')->unique('id')->flatten();

            return response()->json([
                'minPrice' => $min,
                'maxPrice' => $max,
                'allAttributes' => $allAttributes,
                'allColors' => $allColors,
                'allSizes' => $allSizes,
            ]);
        } else {
            return response()->json(['error' => 'هیچ محصولی ثبت نشده'], 404);
        }
    }

    public function getSingleProduct(Request $request): JsonResponse
    {

        $id = $request->query('id');
        $product = Products::query()->find($id)
            ->with(['attributes', 'colors', 'sizes', 'images', 'children'])
            ->first();

        if ($product) {
            return response()->json($product);
        } else {
            return response()->json(['error' => 'محصول پیدا نشد'], 404);
        }
    }

}
