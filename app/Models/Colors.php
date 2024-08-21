<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * 
 *
 * @method static \Database\Factories\ColorsFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|Colors newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Colors newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Colors query()
 * @mixin \Eloquent
 */
class Colors extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
    protected $fillable = ['name', 'color'];
}
