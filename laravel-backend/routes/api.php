<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AudioCategoryController;
use App\Http\Controllers\Api\AudioController;
use App\Http\Controllers\Api\SettingsMenuController;
use App\Http\Controllers\Api\SubscriptionPlanController;

// ── Audios ──────────────────────────────────────────────────────────────────
Route::get('/audio-categories', [AudioCategoryController::class, 'index']);
Route::get('/audios',          [AudioController::class, 'index']);
Route::get('/audios/{id}',     [AudioController::class, 'show']);
Route::post('/audios',         [AudioController::class, 'store']);
Route::put('/audios/{id}',     [AudioController::class, 'update']);
Route::delete('/audios/{id}',  [AudioController::class, 'destroy']);

// ── Settings Menu ────────────────────────────────────────────────────────────
Route::get('/settings-menu',                [SettingsMenuController::class, 'index']);
Route::get('/settings-menu/{id}',           [SettingsMenuController::class, 'show']);
Route::post('/settings-menu',               [SettingsMenuController::class, 'store']);
Route::put('/settings-menu/{id}',           [SettingsMenuController::class, 'update']);
Route::delete('/settings-menu/{id}',        [SettingsMenuController::class, 'destroy']);
Route::patch('/settings-menu/reorder',      [SettingsMenuController::class, 'reorder']);

// ── Settings Pages ───────────────────────────────────────────────────────────
use App\Http\Controllers\Api\SettingsPageController;
Route::get('/settings-pages',                   [SettingsPageController::class, 'index']);
Route::get('/settings-pages/slug/{slug}',       [SettingsPageController::class, 'showBySlug']);
Route::get('/settings-pages/{id}',              [SettingsPageController::class, 'show']);
Route::post('/settings-pages',                  [SettingsPageController::class, 'store']);
Route::put('/settings-pages/{id}',              [SettingsPageController::class, 'update']);
Route::delete('/settings-pages/{id}',           [SettingsPageController::class, 'destroy']);

// ── Subscription Plans ───────────────────────────────────────────────────────
Route::get('/subscription-plans',                   [SubscriptionPlanController::class, 'index']);
Route::get('/subscription-plans/{id}',              [SubscriptionPlanController::class, 'show']);
Route::post('/subscription-plans',                  [SubscriptionPlanController::class, 'store']);
Route::put('/subscription-plans/{id}',              [SubscriptionPlanController::class, 'update']);
Route::delete('/subscription-plans/{id}',           [SubscriptionPlanController::class, 'destroy']);
Route::patch('/subscription-plans/{id}/toggle',     [SubscriptionPlanController::class, 'toggle']);
