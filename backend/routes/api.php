<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;     // Import TaskController
use App\Http\Controllers\CommentController;  // Import CommentController
use App\Http\Controllers\AuthController;

// Register Route
Route::post('/register', [AuthController::class, 'register']); // Public route for registration

// Login Route
Route::post('/login', [AuthController::class, 'login']); // Public route for login

// Authenticated Routes (using auth:sanctum middleware)
Route::middleware('auth:sanctum')->get('/user', [AuthController::class, 'user']); // To get authenticated user's data

// Task Routes (Protected with authentication)
Route::middleware('auth:sanctum')->prefix('tasks')->group(function () {
    Route::post('/', [TaskController::class, 'store']);                 // Create Task
    Route::put('/{id}', [TaskController::class, 'update']);             // Update Task
    Route::get('/', [TaskController::class, 'index']);                  // List Tasks
    Route::get('/{id}', [TaskController::class, 'show']);               // Task Details
    Route::delete('/{id}', [TaskController::class, 'destroy']);         // Delete Task
});

// Comment Routes (Protected with authentication)
Route::middleware('auth:sanctum')->prefix('tasks')->group(function () {
    Route::post('/{task_id}/comments', [CommentController::class, 'store']);  // Add Comment
    Route::get('/{task_id}/comments', [CommentController::class, 'index']);  // List Comments
});
