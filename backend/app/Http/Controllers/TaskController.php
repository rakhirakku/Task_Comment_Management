<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the tasks with filtering and pagination.
     */
    public function index(Request $request)
    {
        // Retrieve query parameters for filtering and pagination
        $status = $request->query('status'); // e.g., 'pending', 'completed'
        $due_date_from = $request->query('due_date_from'); // e.g., '2024-12-01'
        $due_date_to = $request->query('due_date_to'); // e.g., '2024-12-31'
        $perPage = $request->query('per_page', 8); // Default to 10 items per page

        // Use query scopes to filter tasks
        $tasks = Task::query()
            ->filterByStatus($status)
            ->filterByDueDate($due_date_from, $due_date_to)
            ->orderBy('due_date', 'asc') // Order by due_date (ascending)
            ->paginate($perPage); // Paginate results

        // Return paginated data as JSON
        return response()->json($tasks, 200);
    }
    
    /**
     * Store a newly created task in storage.
     */
    public function store(Request $request)
    {
        // Validate the incoming request
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:pending,in-progress,completed',
            'due_date' => 'nullable|date',
        ]);

        // Use Eloquent's create method to insert data into the database
        $task = Task::create($data);

        // Return the created task as a JSON response
        return response()->json($task, 201); // 201 status for "Created"
    }

    /**
     * Update the specified task in storage.
     */
    public function update(Request $request, $id)
    {
        // Find the task or throw a 404 exception if not found
        $task = Task::findOrFail($id);

        // Validate the incoming request
        $data = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|nullable|string',
            'status' => 'sometimes|required|in:pending,in-progress,completed',
            'due_date' => 'sometimes|nullable|date',
        ]);

        // Use Eloquent's update method to update the task
        $task->update($data);

        // Return the updated task as a JSON response
        return response()->json($task);
    }

    /**
     * Remove the specified task from storage.
     */
    public function destroy($id)
    {
        // Find the task or throw a 404 exception if not found
        $task = Task::findOrFail($id);

        // Use Eloquent's delete method to remove the task
        $task->delete();

        // Return a success message
        return response()->json(['message' => 'Task deleted successfully']);
    }

    /**
     * Display the specified task.
     */
    public function show($id)
    {
        // Find the task or throw a 404 exception if not found
        $task = Task::findOrFail($id);

        // Return the task as a JSON response
        return response()->json($task, 200);
    }

}
