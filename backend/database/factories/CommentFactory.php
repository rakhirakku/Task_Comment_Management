<?php

namespace Database\Factories;

use App\Models\Comment;
use App\Models\User;
use App\Models\Task;
use Illuminate\Database\Eloquent\Factories\Factory;

class CommentFactory extends Factory
{
    protected $model = Comment::class;

    public function definition()
    {
        return [
            'author_name' => $this->faker->name, // Randomly pick a user author_name
            'task_id' => Task::inRandomOrder()->first()->id, // Randomly pick a task
            'content' => $this->faker->sentence, // Random sentence for comment content
        ];
    }
}

