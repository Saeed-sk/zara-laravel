<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\favorite;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
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
    public function create(Request $request)
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

    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(favorite $favorite)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(favorite $favorite)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, favorite $favorite)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $favorite = Favorite::query()->where('users_id', $request->user()->id)->where('products_id', $request['product_id'])->first();
        if(!empty($favorite)){
            $favorite->delete();
        }
        return response()->json(['$favorite' => $favorite], 200);
    }
}
