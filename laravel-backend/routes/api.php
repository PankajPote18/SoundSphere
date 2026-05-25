<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\MovieController;
use App\Http\Controllers\Api\SettingsMenuController;
use App\Http\Controllers\Api\SubscriptionPlanController;

// ── Movies ──────────────────────────────────────────────────────────────────
Route::get('/categories',      [CategoryController::class, 'index']);
Route::get('/movies',          [MovieController::class, 'index']);
Route::get('/movies/{id}',     [MovieController::class, 'show']);
Route::post('/movies',         [MovieController::class, 'store']);
Route::put('/movies/{id}',     [MovieController::class, 'update']);
Route::delete('/movies/{id}',  [MovieController::class, 'destroy']);

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
