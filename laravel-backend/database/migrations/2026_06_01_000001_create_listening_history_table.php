<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('listening_history', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('audio_id');
            $table->integer('episode_id')->nullable();
            $table->integer('progress_seconds')->default(0);
            $table->boolean('completed')->default(false);
            $table->timestamp('last_played_at')->useCurrent();
            $table->timestamps();
            
            $table->foreign('audio_id')->references('id')->on('audios')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('listening_history');
    }
};
