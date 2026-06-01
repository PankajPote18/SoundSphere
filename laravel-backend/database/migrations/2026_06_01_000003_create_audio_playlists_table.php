<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('audio_playlists', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('coverImage')->nullable();
            $table->boolean('isPublic')->default(false);
            $table->timestamps();
        });

        Schema::create('audio_playlist_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('audio_playlist_id')->constrained('audio_playlists')->onDelete('cascade');
            $table->string('audio_id');
            $table->integer('order')->default(0);
            $table->timestamps();
            
            $table->foreign('audio_id')->references('id')->on('audios')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('audio_playlist_items');
        Schema::dropIfExists('audio_playlists');
    }
};
