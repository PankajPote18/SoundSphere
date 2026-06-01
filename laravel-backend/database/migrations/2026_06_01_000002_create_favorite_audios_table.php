<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('favorite_audios', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('audio_id');
            $table->timestamps();
            
            $table->foreign('audio_id')->references('id')->on('audios')->onDelete('cascade');
            $table->unique(['user_id', 'audio_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('favorite_audios');
    }
};
