<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\LiraPrice;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class LiraPriceController extends Controller
{
    public function index():JsonResponse
    {
        $price = LiraPrice::query()->first();
        return response()->json(['price' => $price->price]);
    }

    public function updateOrCreate(Request $request):RedirectResponse
    {
        $validate = $request->validate(['price' => 'required|string']);

        LiraPrice::query()->updateOrInsert(['id' => 1], ['price' => $validate['price']]);

        return redirect()->back()->with('success', 'Lira price updated successfully');
    }
}
