<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Help;
use App\Models\HelpsTopics;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class HelpController extends Controller
{
    public function index(): JsonResponse
    {
        $helps = Help::query()->get();
        return response()->json($helps);
    }

    public function getHelpTopic(Request $request): JsonResponse
    {
        $slug = $request->get('slug');
        $helps = HelpsTopics::query()->where('topic', $slug)->first();
        return response()->json($helps);
    }

}
