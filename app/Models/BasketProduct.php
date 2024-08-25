<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

/**
 *
 *
 * @method static \Illuminate\Database\Eloquent\Builder|BasketProduct newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|BasketProduct newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|BasketProduct query()
 */
class BasketProduct extends Pivot
{
    protected $table = 'basket_product';
    protected $fillable = ['basket_id', 'product_id', 'color_id', 'size_id', 'quantity'];
    protected $with = ['color', 'size'];
    public function color(): BelongsTo
    {
        return $this->belongsTo(Colors::class, 'color_id');
    }

    public function size(): BelongsTo
    {
        return $this->belongsTo(Sizes::class, 'size_id');
    }
}
