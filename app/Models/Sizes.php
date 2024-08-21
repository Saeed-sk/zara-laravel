<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * 
 *
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Products> $products
 * @property-read int|null $products_count
 * @method static \Database\Factories\SizesFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|Sizes newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Sizes newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Sizes query()
 * @mixin \Eloquent
 */
class Sizes extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    protected $fillable=['size'];

    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Products::class, 'products_sizes', 'size_id', 'product_id');
    }

}
