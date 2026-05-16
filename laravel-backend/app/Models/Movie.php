<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    protected $guarded = [];
    protected $keyType = 'string';
    public $incrementing = false;
    
    protected $casts = [
        'genres' => 'array',
        'cast' => 'array',
        'isNew' => 'boolean',
        'isTrending' => 'boolean',
        'isOriginal' => 'boolean',
    ];
    
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
