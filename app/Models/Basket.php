<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 *
 *
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Products> $products
 * @property-read int|null $products_count
 * @property-read \App\Models\Sizes|null $size
 * @property-read \App\Models\User|null $users
 * @method static \Database\Factories\BasketFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|Basket newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Basket newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Basket query()
 * @mixin \Eloquent
 */
class Basket extends Model
{
    use HasFactory;
    protected $fillable = ['basket_id', 'product_id', 'color_id','user_id','total_price'];
    protected $with =['products'];
    protected $casts = [
        'basket_id' => 'integer',
        'product_id' => 'integer',
        'color_id' => 'integer',
        'user_id' => 'integer',
        'total_price' => 'string',
    ];


    public function products(): BelongsToMany
    {
        return $this->belongsToMany(
            Products::class,
            'basket_product',
            'basket_id',
            'product_id'
        )->using(BasketProduct::class)
            ->withPivot('color_id', 'size_id', 'quantity');
    }


    public function users(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
