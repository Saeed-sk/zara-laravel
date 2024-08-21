<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * 
 *
 * @property-read \App\Models\Products|null $product
 * @method static \Database\Factories\ImagesFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|Images newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Images newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Images query()
 * @mixin \Eloquent
 */
class Images extends Model
{
    use HasFactory;
    protected $guarded = 'id';
    protected $fillable = ['product_id', 'src'];

    public function product():BelongsTo
    {
        return $this->belongsTo(Products::class, 'product_id', 'id');
    }
}
