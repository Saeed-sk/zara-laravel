<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Colors;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ColorsController extends Controller
{
    public function create(Request $request): RedirectResponse
    {
        $validate = $request->validate([
            'name' => 'required|string',
            'color' => 'required|string',
        ]);
        Colors::query()->create([
            'name' => $validate['name'],
            'color' => $validate['color']
        ]);

        return redirect()->back();
    }

    public function update(Request $request): RedirectResponse
    {
        $validate = $request->validate([
            'name' => 'required|string',
            'color' => 'required|string',
        ]);

        Colors::query()->findOrFail($request['id'])->update([
            'name' => $validate['name'],
            'color' => $validate['color']
        ]);

        return redirect()->back();
    }

    public function destroy(Request $request)
    {
        $size = Colors::query()->findOrFail($request['id']);
        $size->delete();
        return redirect()->back();
    }

}
