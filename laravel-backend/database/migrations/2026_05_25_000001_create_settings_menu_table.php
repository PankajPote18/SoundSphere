<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('settings_menu', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('icon_key');         // maps to lucide icon name
            $table->string('path')->nullable();  // route path for navigation
            $table->boolean('is_highlight')->default(false);
            $table->boolean('is_logout')->default(false);
            $table->boolean('status')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('settings_menu');
    }
};
