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
 * @method static \Database\Factories\attributesFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|attributes newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|attributes newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|attributes query()
 * @mixin \Eloquent
 */
class attributes extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    protected $fillable = ['name','slug'];

    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Products::class, 'product_attributes', 'attribute_id', 'product_id');
    }
}
