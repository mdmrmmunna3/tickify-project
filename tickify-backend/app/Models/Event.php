<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'description',
        'location',
        'start_time',
        'end_time',
        'category',
        'price',
        'image_path',
        'status',
    ];

    protected $appends = ['time_status']; // Autometically Include in JSON output

    public function getTimeStatusAttribute()
    {
        $now = Carbon::now();

        if ($this->start_time > $now)
            return 'upcoming';
        if ($this->end_time < $now)
            return 'done';
        return 'live';
    }
}

