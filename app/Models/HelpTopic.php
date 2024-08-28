<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HelpTopic extends Model
{
    use HasFactory;
    protected $table = ['help_topics'];
    protected $fillable = ['title', 'body', 'help_id', 'slug', 'image'];

    public function help(): BelongsTo
    {
        return $this->belongsTo(Help::class, 'help_id', 'id');
    }
}
