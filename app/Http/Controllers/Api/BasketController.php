<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Basket;
use Illuminate\Http\Request;

class BasketController extends Controller
{
    public function index(Request $request)
    {
        $baskets = Basket::query()->where('user_id', $request['user_id'])->get();
        return response()->json($baskets);
    }

    public function updateOrCreate(Request $request)
    {

    }

    public function delete(Request $request)
    {

    }
}
