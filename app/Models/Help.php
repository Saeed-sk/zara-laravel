<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Help extends Model
{
    use HasFactory;

    protected $table = 'helps';
    protected $fillable = ['id','title'];

    public function topics(): HasMany
    {
        return $this->hasMany(HelpsTopics::class, 'help_id', 'id');
    }
}
