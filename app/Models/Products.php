<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 *
 *
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\attributes> $attributes
 * @property-read int|null $attributes_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Categories> $categories
 * @property-read int|null $categories_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Products> $children
 * @property-read int|null $children_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Colors> $colors
 * @property-read int|null $colors_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Images> $images
 * @property-read int|null $images_count
 * @property-read Products|null $parent
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Sizes> $sizes
 * @property-read int|null $sizes_count
 * @method static \Database\Factories\ProductsFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|Products newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Products newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Products query()
 * @mixin \Eloquent
 */
class Products extends Model
{
    use HasFactory;

    protected $table = 'products';
    protected $fillable = [
        'template',
        'title',
        'slug',
        'description',
        'discount',
        'price',
        'maintenance',
        'parent_id'
    ];
    public function sizes(): BelongsToMany
    {
        return $this->belongsToMany(Sizes::class, 'product_size', 'product_id', 'size_id');
    }

    public function attributes(): BelongsToMany
    {
        return $this->belongsToMany(attributes::class, 'product_attribute', 'product_id', 'attribute_id');
    }

    public function colors(): BelongsToMany
    {
        return $this->belongsToMany(Colors::class,'product_color', 'product_id', 'color_id');
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Categories::class, 'product_category','product_id', 'category_id');
    }

    public function images(): HasMany
    {
        return $this->hasMany(Images::class, 'product_id');
    }

    public function parent():BelongsTo
    {
        return $this->belongsTo(Products::class, 'parent_id', 'id');
    }

    public function children():hasMany
    {
        return $this->hasMany(Products::class, 'parent_id', 'id');
    }

    public function basket(): BelongsToMany
    {
        return $this->belongsToMany(Basket::class, 'basket_product', 'basket_id', 'product_id')
            ->withPivot('color_id', 'size_id', 'quantity', 'total_price')
            ->withTimestamps();
    }
}
