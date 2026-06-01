<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Audio extends Model
{
    protected $table = 'audios';
    public $incrementing = false;
    protected $keyType = 'string';
    
    protected $fillable = [
        'id', 'title', 'audio_category_id', 'coverImage', 'bannerImage', 
        'popularityScore', 'releaseYear', 'duration', 'genres', 'artist', 
        'artists', 'album', 'trackCount', 'audioUrl', 'waveformUrl', 
        'language', 'playCount', 'likes', 'featured', 'newRelease', 
        'description', 'isTrending', 'isOriginal', 'episodes'
    ];

    protected $casts = [
        'genres' => 'array',
        'artists' => 'array',
        'episodes' => 'array',
        'featured' => 'boolean',
        'newRelease' => 'boolean',
        'isTrending' => 'boolean',
        'isOriginal' => 'boolean',
        'popularityScore' => 'float',
    ];

    public function category()
    {
        return $this->belongsTo(AudioCategory::class, 'audio_category_id');
    }
}
