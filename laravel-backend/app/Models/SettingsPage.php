<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SettingsPage extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'short_description',
        'full_content',
        'status',
    ];
}
