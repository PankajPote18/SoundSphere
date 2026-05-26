<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SettingsMenu;

class SettingsMenuSeeder extends Seeder
{
    public function run(): void
    {
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
                'path'         => '/page/about-us',
                'is_highlight' => false,
                'is_logout'    => false,
                'status'       => true,
                'sort_order'   => 3,
            ],
            [
                'name'         => 'Privacy Policy',
                'icon_key'     => 'Shield',
                'path'         => '/page/privacy-policy',
                'is_highlight' => false,
                'is_logout'    => false,
                'status'       => true,
                'sort_order'   => 4,
            ],
            [
                'name'         => 'Refund Policy',
                'icon_key'     => 'LineChart',
                'path'         => '/page/refund-policy',
                'is_highlight' => false,
                'is_logout'    => false,
                'status'       => true,
                'sort_order'   => 5,
            ],
            [
                'name'         => 'Terms and Conditions',
                'icon_key'     => 'FileText',
                'path'         => '/page/terms-and-conditions',
                'is_highlight' => false,
                'is_logout'    => false,
                'status'       => true,
                'sort_order'   => 6,
            ],
            [
                'name'         => 'Dashboard',
                'icon_key'     => 'LayoutDashboard',
                'path'         => '/admin',
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
    }
}
