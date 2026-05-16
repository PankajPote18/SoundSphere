<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $guarded = [];
    protected $keyType = 'string';
    public $incrementing = false;
    
    public function movies()
    {
        return $this->hasMany(Movie::class);
    }
}
