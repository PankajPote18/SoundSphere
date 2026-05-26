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

        $this->call([
            SettingsMenuSeeder::class,
            SettingsPageSeeder::class,
            SubscriptionPlanSeeder::class,
        ]);
    }
}
