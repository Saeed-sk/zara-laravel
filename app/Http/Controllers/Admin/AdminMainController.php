<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\attributes;
use App\Models\Categories;
use App\Models\Colors;
use App\Models\Products;
use App\Models\Sizes;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminMainController extends Controller
{
    public function getAttributes(): JsonResponse
    {
        $sizes = Sizes::all();
        $attributes = attributes::all();
        $colors = Colors::all();

        return response()->json(['sizes' => $sizes, 'attributes' => $attributes, 'colors' => $colors], 200);
    }

    public function getAllAttributeWithCategory(): JsonResponse
    {
        $categories = Categories::query()->whereNotNull('parent_id')->get();
        $attributes = attributes::all();
        $colors = Colors::all();
        $sizes = Sizes::all();
        return response()->json(['categories' => $categories, 'attributes' => $attributes, 'colors' => $colors, 'sizes' => $sizes], 200);
    }

    public function searchCollection(Request $request): JsonResponse
    {
        $query = $request['query'];
        $products = Products::query()->where('title', 'LIKE', "%{$query}%")
            ->orWhere('slug', 'LIKE', "%{$query}%")
            ->orWhere('id', 'LIKE', "%{$query}%")
            ->get();

        return response()->json(['products' => $products]);
    }

}
