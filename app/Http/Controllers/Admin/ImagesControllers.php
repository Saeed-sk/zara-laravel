<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Images;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ImagesControllers extends Controller
{
    public function destroy(Request $request):RedirectResponse
    {
        Images::destroy($request['id']);
        return redirect()->back()->with('success', 'Image deleted successfully!');
    }
}
