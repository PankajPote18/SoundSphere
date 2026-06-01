<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('audios', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('title');
            $table->string('audio_category_id');
            $table->string('coverImage')->nullable();
            $table->string('bannerImage')->nullable();
            $table->decimal('popularityScore', 3, 1)->default(0.0);
            $table->integer('releaseYear')->nullable();
            $table->string('duration')->nullable();
            $table->json('genres')->nullable();
            $table->string('artist')->nullable();
            $table->json('artists')->nullable();
            $table->string('album')->nullable();
            $table->integer('trackCount')->default(1);
            $table->string('audioUrl')->nullable();
            $table->string('waveformUrl')->nullable();
            $table->string('language')->default('English');
            $table->integer('playCount')->default(0);
            $table->integer('likes')->default(0);
            $table->boolean('featured')->default(false);
            $table->boolean('newRelease')->default(false);
            $table->text('description')->nullable();
            $table->boolean('isTrending')->default(false);
            $table->boolean('isOriginal')->default(false);
            $table->json('episodes')->nullable();
            $table->timestamps();
            
            $table->foreign('audio_category_id')->references('id')->on('audio_categories')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('audios');
    }
};
