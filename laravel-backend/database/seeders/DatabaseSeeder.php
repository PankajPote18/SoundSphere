<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\AudioCategory;
use App\Models\Audio;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // ── Audio Categories ─────────────────────────────────
        $categories = [
            ['id' => 'hero',        'name' => 'Hero Carousel'],
            ['id' => 'trending',    'name' => 'Trending Audios'],
            ['id' => 'new_releases','name' => 'New Releases'],
            ['id' => 'podcasts',    'name' => 'Top Podcasts'],
            ['id' => 'audiobooks',  'name' => 'Bestselling Audiobooks'],
            ['id' => 'originals',   'name' => 'SoundSphere Originals'],
            ['id' => 'continue',    'name' => 'Continue Listening'],
            ['id' => 'music',       'name' => 'Featured Music'],
            ['id' => 'interviews',  'name' => 'Exclusive Interviews'],
            ['id' => 'lofi',        'name' => 'Lo-Fi & Ambient'],
        ];

        foreach ($categories as $cat) {
            AudioCategory::updateOrCreate(['id' => $cat['id']], $cat);
        }

        // ── Audios ──────────────────────────────────────────
        $audioNames = [
            'Neon Drift', 'Midnight Architects', 'Velvet Arcade', 'Ember Scripts', 
            'Paper Kingdoms', 'Whispering Tide', 'Future You Lab', 'Streetlight Profits', 
            'Iron Lullaby', 'Orange Veil', 'Cipher Hollow', 'Laughing Operators',
            'Echoes After Midnight', 'Lost Frequencies', 'Neon Memories', 'Sunset Signals',
            'Digital Horizons', 'Acoustic Dreams', 'Silent Frequencies', 'Last Signal'
        ];
        
        $artists = [
            'Luna Echo', 'Atlas Grey', 'Nova Hart', 'Ethan Vale', 
            'Aurora Sky', 'Oliver Reed', 'Maya Brooks', 'Kai Morgan'
        ];

        $genresList = ['Podcast', 'Audiobook', 'Pop', 'Rock', 'Indie', 'Electronic', 'Jazz', 'Lo-Fi', 'Classical', 'Hip-Hop', 'Ambient'];

        $episodeTitles = [
            "Lanterns and Lost Directions", "The Map Vendor's Riddle", "Cameras in the Alley Sky",
            "Neon Streets", "Silent Frequencies", "Last Signal", "Whispers in the Dark", "The Final Note",
            "Echoes of Tomorrow", "Digital Dawn", "Cyber Dreams", "Midnight Runner", "Electric Soul"
        ];

        $coverImages = [
            'https://images.unsplash.com/photo-1614145121029-83a9f7b68bf4?q=80&w=480&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=480&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=480&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1493225457124-a1a2a4afb632?q=80&w=480&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=480&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=480&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=480&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1516280440502-8610025f16f3?q=80&w=480&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1520523839897-bd0b5edff6e5?q=80&w=480&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1485030056468-3820ff9e6e90?q=80&w=480&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=480&auto=format&fit=crop',
        ];

        $bannerImages = [
            'https://images.unsplash.com/photo-1614145121029-83a9f7b68bf4?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1493225457124-a1a2a4afb632?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop',
        ];

        $audios = [];
        for ($i = 1; $i <= 50; $i++) {
            $artistName = $artists[array_rand($artists)];
            $episodesCount = rand(3, 8);
            $episodes = [];
            for ($e = 1; $e <= $episodesCount; $e++) {
                $episodes[] = [
                    'id' => $e,
                    'title' => $episodeTitles[array_rand($episodeTitles)],
                    'durationSeconds' => rand(300, 1500),
                    'date' => '2026-0' . rand(1, 6) . '-01'
                ];
            }

            $catId = $categories[array_rand($categories)]['id'];
            
            $audios[] = [
                'id' => 'audio_' . $i,
                'title' => $audioNames[array_rand($audioNames)] . ' ' . $i,
                'audio_category_id' => $catId,
                'coverImage' => $coverImages[array_rand($coverImages)],
                'bannerImage' => $bannerImages[array_rand($bannerImages)],
                'popularityScore' => rand(30, 50) / 10,
                'releaseYear' => rand(2020, 2026),
                'duration' => rand(15, 120) . 'm',
                'genres' => [$genresList[array_rand($genresList)], $genresList[array_rand($genresList)]],
                'artist' => $artistName,
                'artists' => [$artistName],
                'album' => 'Album ' . $i,
                'trackCount' => $episodesCount,
                'audioUrl' => null,
                'waveformUrl' => null,
                'language' => 'English',
                'playCount' => rand(100, 10000),
                'likes' => rand(10, 1000),
                'featured' => rand(0, 1) == 1,
                'newRelease' => rand(0, 1) == 1,
                'description' => 'A fascinating audio journey. Tune in to experience the latest sounds and stories that feel like magic and end like a puzzle.',
                'isTrending' => rand(0, 1) == 1,
                'isOriginal' => rand(0, 1) == 1,
                'episodes' => $episodes,
            ];
        }

        foreach ($audios as $audio) {
            Audio::updateOrCreate(['id' => $audio['id']], $audio);
        }

        $this->call([
            SettingsMenuSeeder::class,
            SettingsPageSeeder::class,
            SubscriptionPlanSeeder::class,
        ]);
    }
}
