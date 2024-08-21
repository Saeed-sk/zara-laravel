<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Banners;
use http\Env\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use function Pest\Laravel\json;

class BannersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $parent = $request->query('parent');
        $banners = Banners::query()->where('category_id', $parent)->get();
        if (count($banners) > 0) {
            return response()->json($banners);
        }
        return response()->json(['error' => 'کتگوری یافت نشد'], 404);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $validate = $request->validate([
            'category_id' => 'numeric|required',
            'src' => 'required|string',
            'slug' => 'required|string|unique:categories,slug',
        ]);

        $file = $request->file('image');
        $filename = null;

        $file = $request->file('src');
        $filename = null;

        if ($file) {

            $filename = time() . '.' . $file->getClientOriginalExtension();

            $path = $file->storeAs('public/images', $filename);

            $publicPath = public_path('images');
            if (!file_exists($publicPath)) {
                mkdir($publicPath, 0777, true);
            };
            $file->move($publicPath, $filename);
        }
        $banners = Banners::query()->create([
            'category_id' => $validate['category_id'],
            'image' => $filename ? '/images/' . $filename : null,
            'slug' => $validate['slug'],
        ]);
        return redirect()->back();

    }

    public function update(Request $request)
    {
        dd($request->all());
        $banner = Banners::query()->findOrFail($request->id);

        if ($request->hasFile('image')) {
            $file = $request->file('image');

            $filename = time() . '.' . $file->getClientOriginalExtension();

            $publicPath = public_path('images');
            if (!file_exists($publicPath)) {
                mkdir($publicPath, 0777, true);
            }
            $file->move($publicPath, $filename);

            $publicImagePath = $publicPath . '/' . $filename;

            if ($banner->image) {
                $oldImagePath = public_path($banner->image);
                if (File::exists($oldImagePath)) {
                    File::delete($oldImagePath);
                }
            }
            $banner->image = 'images/' . $filename;
        }
        $banner->slug = $request->slug;
        $banner->category_id = $request->category_id;

        $banner->save();
        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Banners::query()->find($request['id'])->delete();
        return redirect()->back();
    }
}
