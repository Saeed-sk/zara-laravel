<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    use HasFactory;

    protected $table = 'orders';
    protected $fillable = [
        'user_id',
        'phone',
        'total_price',
        'address_id',
        'payment_id',
        'basket_id',
    ];

    public function basket(): BelongsTo
    {
        return $this->belongsTo(Basket::class , 'basket_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class , 'user_id');
    }

    public function address(): BelongsTo
    {
        return $this->belongsTo(Addresses::class , 'address_id');
    }

    public function payment(): BelongsTo
    {
        return $this->belongsTo(Payments::class , 'payment_id');
    }
}
