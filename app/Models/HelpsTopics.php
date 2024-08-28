<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HelpsTopics extends Model
{
    use HasFactory;
    protected $table = 'helps_topics';
    protected $fillable = ['title', 'body', 'help_id', 'slug', 'image','id'];

    public function help(): BelongsTo
    {
        return $this->belongsTo(Help::class, 'help_id', 'id');
    }
}
