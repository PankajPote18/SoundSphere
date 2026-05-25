<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SettingsMenu extends Model
{
    protected $table = 'settings_menu';

    protected $guarded = [];

    protected $casts = [
        'is_highlight' => 'boolean',
        'is_logout'    => 'boolean',
        'status'       => 'boolean',
    ];
}
