<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Category;
use App\Models\Movie;
use App\Models\SettingsMenu;
use App\Models\SubscriptionPlan;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // ── Categories & Movies (unchanged) ─────────────────────────────────
        $categories = [
            ['id' => 'hero',        'title' => 'Hero Carousel',              'type' => 'hero'],
            ['id' => 'drama',       'title' => 'Drama TV',                   'type' => 'row'],
            ['id' => 'recommended', 'title' => 'Recommended movies',         'type' => 'row'],
            ['id' => 'languages',   'title' => 'Watch in Your Language',     'type' => 'language'],
            ['id' => 'continue',    'title' => 'Continue watching',          'type' => 'row'],
            ['id' => 'top_movies',  'title' => 'Top movies',                 'type' => 'row'],
            ['id' => 'originals',   'title' => 'Featured Originals: Series', 'type' => 'row'],
        ];

        foreach ($categories as $cat) {
            Category::updateOrCreate(['id' => $cat['id']], $cat);
        }

        // (Keep existing movie seeding exactly as before — abbreviated here for clarity)
        // ...paste the original $movies array and loop here unchanged...

        // ── Settings Menu ────────────────────────────────────────────────────
        $menuItems = [
            [
                'name'         => 'Explore Plans',
                'icon_key'     => 'Zap',
                'path'         => '/plans',
                'is_highlight' => true,
                'is_logout'    => false,
                'status'       => true,
                'sort_order'   => 1,
            ],
            [
                'name'         => 'My List',
                'icon_key'     => 'Bookmark',
                'path'         => '/mylist',
                'is_highlight' => false,
                'is_logout'    => false,
                'status'       => true,
                'sort_order'   => 2,
            ],
            [
                'name'         => 'About',
                'icon_key'     => 'Info',
                'path'         => null,
                'is_highlight' => false,
                'is_logout'    => false,
                'status'       => true,
                'sort_order'   => 3,
            ],
            [
                'name'         => 'Privacy Policy',
                'icon_key'     => 'Shield',
                'path'         => null,
                'is_highlight' => false,
                'is_logout'    => false,
                'status'       => true,
                'sort_order'   => 4,
            ],
            [
                'name'         => 'Refund Policy',
                'icon_key'     => 'LineChart',
                'path'         => null,
                'is_highlight' => false,
                'is_logout'    => false,
                'status'       => true,
                'sort_order'   => 5,
            ],
            [
                'name'         => 'Terms and Conditions',
                'icon_key'     => 'FileText',
                'path'         => null,
                'is_highlight' => false,
                'is_logout'    => false,
                'status'       => true,
                'sort_order'   => 6,
            ],
            [
                'name'         => 'Dashboard',
                'icon_key'     => 'LayoutDashboard',
                'path'         => null,
                'is_highlight' => false,
                'is_logout'    => false,
                'status'       => true,
                'sort_order'   => 7,
            ],
            [
                'name'         => 'Logout',
                'icon_key'     => 'LogOut',
                'path'         => null,
                'is_highlight' => false,
                'is_logout'    => true,
                'status'       => true,
                'sort_order'   => 8,
            ],
        ];

        foreach ($menuItems as $item) {
            SettingsMenu::updateOrCreate(
                ['name' => $item['name']],
                $item
            );
        }

        // ── Subscription Plans ───────────────────────────────────────────────
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
