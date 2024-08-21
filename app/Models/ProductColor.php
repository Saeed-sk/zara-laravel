<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

/**
 * 
 *
 * @method static \Database\Factories\ProductColorFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|ProductColor newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProductColor newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProductColor query()
 * @mixin \Eloquent
 */
class ProductColor extends Pivot
{
    use HasFactory;
    protected $guarded = ['id'];
    protected $fillable = ['product_id','color_id'];
}
