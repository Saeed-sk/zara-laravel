<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class OTPController extends Controller
{
    public function sendOtp(Request $request): JsonResponse
    {
        $user = User::query()->where('phone_number', $request->phone_number)->first();
        if ($user) {
            $otp = rand(100000, 999999);
//            send otp
            $user->otp = Hash::make($otp);
            $user->save();
            return response()->json(['message' => 'OTP sent successfully']);
        }
        return response()->json(['error' => 'User not found'], 404);
    }

    public function verifyOtp(Request $request): JsonResponse
    {
        $user = User::query()->where('phone_number', $request->phone_number)->first();
        if ($user && Hash::check($request->otp, $user->otp)) {
            $token = $user->createToken('User token')->plainTextToken;
            return response()->json(['token' => $token]);
        }
        return response()->json(['error' => 'رمز عبور نا معتبر است'], 401);
    }
}
