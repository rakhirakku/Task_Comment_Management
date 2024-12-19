<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\CommentController;

Route::get('/', function () {
    return view('welcome');
});

// Task Routes
// Route::prefix('tasks')->group(function () {
//     Route::post('/', [TaskController::class, 'store']);                 // Create Task
//     Route::get('/', [TaskController::class, 'index']);                  // List Tasks
//     Route::get('/{id}', [TaskController::class, 'show']);               // Task Details
//     Route::put('/{id}', [TaskController::class, 'update']);             // Update Task
//     Route::delete('/{id}', [TaskController::class, 'destroy']);         // Delete Task

//     Route::post('/{task_id}/comments', [CommentController::class, 'store']);  // Add Comment
//     Route::get('/{task_id}/comments', [CommentController::class, 'index']);  // List Comments
// });