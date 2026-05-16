<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('movies', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('title');
            $table->string('category_id');
            $table->string('posterUrl');
            $table->string('backdropUrl');
            $table->decimal('rating', 3, 1);
            $table->integer('year');
            $table->string('duration');
            $table->json('genres');
            $table->json('cast');
            $table->text('description');
            $table->boolean('isNew')->default(false);
            $table->boolean('isTrending')->default(false);
            $table->boolean('isOriginal')->default(false);
            $table->string('ageRating');
            $table->timestamps();
            
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('movies');
    }
};
