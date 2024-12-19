<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'status', 'due_date'];

    /**
     * Scope for filtering by status.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string|null $status
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeFilterByStatus($query, $status)
    {
        if (!empty($status)) {
            return $query->where('status', $status);
        }
        return $query;
    }

    /**
     * Scope for filtering by due_date range.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string|null $from
     * @param string|null $to
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeFilterByDueDate($query, $from = null, $to = null)
    {
        if (!empty($from) && !empty($to)) {
            return $query->whereBetween('due_date', [$from, $to]);
        } elseif (!empty($from)) {
            return $query->where('due_date', '>=', $from);
        } elseif (!empty($to)) {
            return $query->where('due_date', '<=', $to);
        }
        return $query;
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
