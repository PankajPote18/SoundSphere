<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SubscriptionPlan;

class SubscriptionPlanSeeder extends Seeder
{
    public function run(): void
    {
        $plans = [
            [
                'name'            => 'Daily',
                'original_price'  => 10.00,
                'discounted_price' => 7.00,
                'billing_cycle'   => 'DAILY',
                'number_of_days'  => 1,
                'sort_order'      => 1,
                'status'          => false,
                'is_recommended'  => false,
            ],
            [
                'name'            => 'Weekly',
                'original_price'  => 70.00,
                'discounted_price' => 42.00,
                'billing_cycle'   => 'WEEKLY',
                'number_of_days'  => 7,
                'sort_order'      => 2,
                'status'          => true,
                'is_recommended'  => true,
            ],
            [
                'name'            => 'Monthly',
                'original_price'  => 300.00,
                'discounted_price' => 149.00,
                'billing_cycle'   => 'MONTHLY',
                'number_of_days'  => 30,
                'sort_order'      => 3,
                'status'          => true,
                'is_recommended'  => false,
            ],
            [
                'name'            => 'Yearly',
                'original_price'  => 2000.00,
                'discounted_price' => 799.00,
                'billing_cycle'   => 'YEARLY',
                'number_of_days'  => 365,
                'sort_order'      => 4,
                'status'          => true,
                'is_recommended'  => false,
            ],
        ];

        foreach ($plans as $plan) {
            SubscriptionPlan::updateOrCreate(
                ['name' => $plan['name']],
                $plan
            );
        }
    }
}
