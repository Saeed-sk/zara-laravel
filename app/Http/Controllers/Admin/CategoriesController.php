<?php

namespace App\Http\Controllers\Admin;

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
        $categories = Categories::query()->whereNull('parent_id')->with('children.children.children.children')->get();
        $allCategories = Categories::query()->with(['children'])->get();
        if (!empty($categories)) {
            return response()->json([
                'categories' => $categories,
                'allCategories' => $allCategories
            ], 200);
        } else {
            return response()->json(['error' => "هیچ کتگوری ثبت نشده"]);
        }
    }

    public function create(Request $request): RedirectResponse
    {
        $validate = $request->validate([
            'template' => 'string|required',
            'title' => 'required|string',
            'slug' => 'required|string|unique:categories,slug',
            'parent_id' => 'nullable|numeric'
        ]);
        return redirect()->back();
    }

    public function update(Request $request): RedirectResponse
    {
        $validate = $request->validate([
            'template' => 'required|string',
            'title' => 'required|string',
            'slug' => 'required|string',
            'parent_id' => 'nullable|numeric'
        ]);

        $category = Categories::query()->findOrFail($request->id);


        $category->title = $validate['title'];
        $category->slug = $validate['slug'];
        $category->parent_id = $validate['parent_id'];


        $category->save();
        return redirect()->back();
    }

    public function destroy(Request $request): RedirectResponse
    {
        $category = Categories::query()->findOrFail($request->id);
        $category->delete();
        return redirect()->back();
    }

}
