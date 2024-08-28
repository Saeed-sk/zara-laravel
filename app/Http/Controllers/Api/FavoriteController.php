<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\favorite;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Js;

class FavoriteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index():JsonResponse
    {
        $favorites = Favorite::query()->where('user_id', auth()->user()->id)->get();
        if (count($favorites) > 0) {
            return response()->json(['$favorites' => $favorites], 200);
        }
        return response()->json(['error' => 'هیچ علاقه‌مندی‌ای برای شما وجود ندارد'], 404);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request):JsonResponse
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $favorite = new Favorite();
        $favorite->users_id = $request->user()->id;
        $favorite->products_id = $request['product_id'];
        $favorite->save();
        return response()->json(['$favorite' => $favorite], 200);
    }

    public function destroy(Request $request):JsonResponse
    {
        $favorite = Favorite::query()->where('users_id', $request->user()->id)->where('products_id', $request['product_id'])->first();
        if(!empty($favorite)){
            $favorite->delete();
        }
        return response()->json(['$favorite' => $favorite], 200);
    }
}
