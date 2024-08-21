<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * 
 *
 * @property-read \App\Models\User|null $user
 * @method static \Database\Factories\AddressesFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|Addresses newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Addresses newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Addresses query()
 * @mixin \Eloquent
 */
class Addresses extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'phone',
        'address',
        'postcode',
        'state',
        'user_id'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
