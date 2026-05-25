<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubscriptionPlan extends Model
{
    protected $table = 'subscription_plans';

    protected $guarded = [];

    protected $casts = [
        'original_price'   => 'float',
        'discounted_price' => 'float',
        'number_of_days'   => 'integer',
        'sort_order'       => 'integer',
        'status'           => 'boolean',
        'is_recommended'   => 'boolean',
    ];
}
