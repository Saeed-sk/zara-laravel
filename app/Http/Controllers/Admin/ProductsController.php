<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Images;
use App\Models\Products;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class ProductsController extends Controller
{
    public function collectionIndex(): JsonResponse
    {
        $products = Products::query()->where('template', 'collection')
            ->with(['images', 'categories', 'images', 'colors', 'attributes', 'sizes'])
            ->with(['children' => function ($query) {
                $query->with('categories')
                    ->with('attributes')
                    ->with('colors')
                    ->with('sizes')
                    ->with('images');
            }])->paginate();
        if (empty($products)) {
            return response()->json(['error' => 'هیج محصولی ثبت نشده'], 404);
        } else {
            return response()->json($products, 200);
        }
    }
    public function singleIndex(): JsonResponse
    {
        $products = Products::query()->where('template', 'single')
            ->with(['images', 'categories', 'images', 'colors', 'attributes', 'sizes'])
            ->with(['children' => function ($query) {
                $query->with('categories')
                    ->with('attributes')
                    ->with('colors')
                    ->with('sizes')
                    ->with('images');
            }])->paginate();
        if (empty($products)) {
            return response()->json(['error' => 'هیج محصولی ثبت نشده'], 404);
        } else {
            return response()->json($products, 200);
        }
    }

    public function create(Request $request): RedirectResponse
    {
        $validate = $request->validate([
            'template' => 'string|required',
            'title' => 'required|string',
            'slug' => 'required|string|unique:products,slug',
            'price' => 'required|numeric',
            'category_id' => 'required',
            'description' => 'required|string',
            'images' => 'required',
            'maintenance' => 'required|string',
            'discount' => 'required|numeric'
        ]);

        try {
            DB::transaction(function () use ($validate, $request) {
                $product = Products::create([
                    'template' => $validate['template'],
                    'title' => $validate['title'],
                    'slug' => $validate['slug'],
                    'price' => $validate['price'],
                    'description' => $validate['description'],
                    'maintenance' => $validate['maintenance'],
                    'discount' => $validate['discount'],
                    'parent_id' => $request['parent_id']
                ]);
                $product->categories()->sync($validate['category_id']);
                $product->colors()->sync($request['color_id']);
                $product->sizes()->sync($request['sizes']);
                $product->attributes()->sync($request['attributes']);
                if ($request->hasFile('images')) {
                    foreach ($request->file('images') as $file) {
                        $path = $file->store('images', 'public');
                        Images::create([
                            'product_id' => $product->id,
                            'src' => $path,
                        ]);
                    }
                }
            });
            return redirect()->back();
        } catch (\Exception $exception) {
            return redirect()->back()->withErrors(['error' => $exception->getMessage()]);
        }
    }

    public function update(Request $request): RedirectResponse
    {
        $request->validate(['id' => 'required']);

        $validate = $request->validate([
            'template' => 'string|required',
            'title' => 'required|string',
            'slug' => ['required', 'string', Rule::unique('products', 'slug')->ignore($request['id'])],
            'price' => 'required|numeric',
            'category_id' => 'required',
            'description' => 'required|string',
            'images' => 'nullable|array',
            'maintenance' => 'required|string',
            'discount' => 'required|numeric',
            'color_id' => 'nullable|array',
            'sizes' => 'nullable|array',
            'attributes' => 'nullable|array'
        ]);

        try {
            DB::transaction(function () use ($validate, $request, $id) {
                $product = Products::findOrFail($id);

                $product->update([
                    'template' => $validate['template'],
                    'title' => $validate['title'],
                    'slug' => $validate['slug'],
                    'price' => $validate['price'],
                    'description' => $validate['description'],
                    'maintenance' => $validate['maintenance'],
                    'discount' => $validate['discount'],
                    'parent_id' => $request->input('parent_id', $product->parent_id)
                ]);

                $product->categories()->sync($validate['category_id']);
                $product->colors()->sync($request->input('color_id', []));
                $product->sizes()->sync($request->input('sizes', []));
                $product->attributes()->sync($request->input('attributes', []));
                if ($request->hasFile('images')) {
                    $product->images()->delete();

                    foreach ($request->file('images') as $file) {
                        $path = $file->store('images', 'public');
                        Images::create([
                            'product_id' => $product->id,
                            'src' => $path,
                        ]);
                    }
                }
            });

            return redirect()->back()->with('success', 'Product updated successfully!');
        } catch (\Exception $exception) {
            return redirect()->back()->withErrors(['error' => $exception->getMessage()]);
        }
    }

    public function destroy(Request $request): RedirectResponse
    {
        $request->validate(['id' => 'required|exists:products,id']);

        try {
            DB::transaction(function () use ($request) {
                $product = Products::findOrFail($request->id);

                $product->categories()->detach();
                $product->colors()->detach();
                $product->sizes()->detach();
                $product->attributes()->detach();

                foreach ($product->images as $image) {
                    Storage::disk('public')->delete($image->src);
                    $image->delete();
                }

                $product->delete();
            });

            return redirect()->back()->with('success', 'Product deleted successfully!');
        } catch (\Exception $exception) {
            return redirect()->back()->withErrors(['error' => $exception->getMessage()]);
        }
    }

    public function search(Request $request): JsonResponse
    {
        $query = $request['query'];
        $products = Products::query()->where('title', 'LIKE', "%{$query}%")
            ->orWhere('slug', 'LIKE', "%{$query}%")
            ->with('categories')
            ->with('attributes')
            ->with('colors')
            ->with('sizes')
            ->with('images')
            ->with(['children' => function ($query) {
                $query->with('categories')
                    ->with('attributes')
                    ->with('colors')
                    ->with('sizes')
                    ->with('images');
            }])->take(50)->get();

        if ($products) {
            return response()->json(['products' => $products]);
        } else {
            return response()->json(['products' => []]);
        }
    }
}
