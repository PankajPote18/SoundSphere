<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AudioCategory extends Model
{
    protected $table = 'audio_categories';
    public $incrementing = false;
    protected $keyType = 'string';
    
    protected $fillable = ['id', 'name'];

    public function audios()
    {
        return $this->hasMany(Audio::class);
    }
}
