<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

/**
 * 
 *
 * @method static \Database\Factories\ProductSizeFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSize newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSize newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSize query()
 * @mixin \Eloquent
 */
class ProductSize extends Pivot
{
    use HasFactory;
    protected $guarded = ['id'];
    protected $fillable = ['product_id', 'size_id'];
}
