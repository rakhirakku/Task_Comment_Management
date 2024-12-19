<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Task;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function index($task_id)
    {
        $task = Task::findOrFail($task_id);
        return response()->json($task->comments);
    }

    public function store(Request $request, $task_id)
    {
        $task = Task::findOrFail($task_id);

        $data = $request->validate([
            'content' => 'required|string',
            'author_name' => 'required|string|max:255',
        ]);

        $comment = $task->comments()->create($data);
        return response()->json($comment, 201);
    }
}

