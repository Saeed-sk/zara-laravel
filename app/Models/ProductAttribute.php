<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

/**
 * 
 *
 * @method static \Database\Factories\ProductAttributeFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|ProductAttribute newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProductAttribute newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProductAttribute query()
 * @mixin \Eloquent
 */
class ProductAttribute extends Pivot
{
    use HasFactory;
    protected $guarded = ['id'];
    protected $fillable = ['product_id','attribute_id'];
}
