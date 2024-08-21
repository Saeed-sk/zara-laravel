<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\attributes;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class AttributeController extends Controller
{
    public function create(Request $request): RedirectResponse
    {
        $validate = $request->validate([
            'name' => 'required|string',
            'slug' => 'required|string'
        ]);
        attributes::query()->create([
            'name' => $validate['name'],
            'slug' => $validate['slug']
        ]);

        return redirect()->back();
    }

    public function update(Request $request): RedirectResponse
    {
        $validate = $request->validate([
            'name' => 'required|string',
            'slug' => 'required|string'
        ]);
        attributes::query()->findOrFail($request['id'])->update([
            'name' => $validate['name'],
            'slug' => $validate['slug']
        ]);

        return redirect()->back();
    }

    public function destroy(Request $request)
    {
        $size = attributes::query()->findOrFail($request['id']);
        $size->delete();
        return redirect()->back();
    }

}
