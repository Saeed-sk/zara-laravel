<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * 
 *
 * @method static \Illuminate\Database\Eloquent\Builder|LiraPrice newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LiraPrice newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LiraPrice query()
 * @mixin \Eloquent
 */
class LiraPrice extends Model
{
    protected $guarded = ['id'];
    protected $fillable = ['price'];
}
