<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'task_id',      // Foreign key to associate with Task
        'content',      // Comment content
        'author_name',  // Name of the author
    ];
    public function task()
    {
        return $this->belongsTo(Task::class);
    }
}
