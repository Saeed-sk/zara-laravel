<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 *
 *
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Categories> $children
 * @property-read int|null $children_count
 * @property-read Categories|null $parent
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Products> $products
 * @property-read int|null $products_count
 * @method static \Database\Factories\CategoriesFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|Categories newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Categories newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Categories query()
 * @mixin \Eloquent
 */
class Categories extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
    protected $fillable = ['template', 'title', 'slug', 'parent_id'];

    public function children(): HasMany
    {
        return $this->hasMany(Categories::class, 'parent_id');
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Categories::class, 'parent_id');
    }

    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Products::class, 'product_category', 'category_id', 'product_id');
    }

    public function hasProducts(): bool
    {
        return count($this->products) > 0;
    }

    public function banners(): HasMany
    {
        return $this->hasMany(Banners::class, 'category_id');
    }
}
