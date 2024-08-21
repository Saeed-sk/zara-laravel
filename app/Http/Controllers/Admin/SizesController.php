<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Sizes;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class SizesController extends Controller
{
    public function create(Request $request): RedirectResponse
    {
        $validate = $request->validate([
            'size' => 'required|string',
        ]);
        Sizes::query()->create([
            'size' => $validate['size']
        ]);

        return redirect()->back();
    }

    public function update(Request $request): RedirectResponse
    {
        $validate = $request->validate([
            'size' => 'required|string',
        ]);
        Sizes::query()->findOrFail($request['id'])->update([
            'size' => $validate['size']
        ]);

        return redirect()->back();
    }

    public function destroy(Request $request): RedirectResponse
    {
        $size = Sizes::query()->findOrFail($request['id']);
        $size->delete();
        return redirect()->back();
    }
}
