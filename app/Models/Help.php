<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Help extends Model
{
    use HasFactory;

    protected $table = 'helps';
    protected $fillable = ['title'];
    protected $with = ['topics'];

    public function topics(): HasMany
    {
        return $this->hasMany(HelpTopic::class, 'help_id', 'id');
    }
}
