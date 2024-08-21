<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Categories;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class CategoriesController extends Controller
{
    public function index(): JsonResponse
    {
        $categories = Categories::query()->whereNull('parent_id')->with('children.children.children.children')->with('banners')->get();
        if (!empty($categories)) {
            return response()->json($categories, 200);
        } else {
            return response()->json(['error' => "هیچ کتگوری ثبت نشده"]);
        }
    }

}
