<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

class EventController extends Controller
{

    // retrive all events 
    public function allEvents()
    {
        $events = Event::all();
        return response()->json([
            'events' => $events,
            'message' => 'Fetch all events'
        ], 200);
    }

    // retrive all stored event by filtering
    public function index(Request $request)
    {
        $query = Event::query();

        // Filter by title (search)
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%$search%")
                    ->orWhere('description', 'like', "%$search%");
            });
        }

        //  Filter by category
        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        // Filter by time-based status (upcoming, live, done)
        if ($request->filled('time_status')) {
            $now = Carbon::now();

            switch ($request->time_status) {
                case 'upcoming':
                    $query->where('start_time', '>', $now);
                    break;
                case 'live':
                    $query->where('start_time', '<=', $now)
                        ->where('end_time', '>=', $now);
                    break;
                case 'done':
                    $query->where('end_time', '<', $now);
                    break;
            }
        }


        $events = $query->orderBy('start_time', 'desc')->paginate(6);

        return response()->json([
            'events' => $events,
            'message' => 'Filtered and paginated events'
        ], 200);
    }


    public function categories()
    {
        $categories = Event::select('category')
            ->distinct()
            ->orderBy('category')
            ->pluck('category');

        return response()->json([
            'categories' => $categories
        ], 200);
    }

    public function show($id)
    {
        $event = Event::find($id);

        if (!$event) {
            return response()->json([
                'message' => 'Event not found'
            ], 404);
        }

        return response()->json([
            'event' => $event,
            'message' => 'Event fetched successfully'
        ], 200);
    }


    // create a event 
    public function store(Request $request)
    {
        try {
            // apply validate 
            $validate = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'location' => 'nullable|string',
                'start_time' => 'required|date',
                'end_time' => 'required|date|after_or_equal:start_time',
                'category' => 'nullable|string',
                'status' => 'in:draft,published',
                'price' => 'required|numeric|min:0',
                'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            ]);

            // handle file uploading 
            if ($request->hasFile('image')) {
                $path = $request->file('image')->store('events', 'public');
                $validate['image_path'] = $path;
            }

            // now creating an event 
            $event = Event::create($validate);

            return response()->json([
                'status' => true,
                'message' => 'Event Create Successfully!',
                'event' => $event
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => 'An error occurred',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    // update event 
    public function update(Request $request, Event $event)
    {
        try {
            // Validate the input
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'location' => 'nullable|string',
                'start_time' => 'required|date',
                'end_time' => 'required|date|after_or_equal:start_time',
                'category' => 'nullable|string',
                'status' => 'in:draft,published',
                'price' => 'required|numeric|min:0',
                'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            ]);

            // Handle image upload if provided
            if ($request->hasFile('image')) {
                // Delete old image if it exists
                if ($event->image_path) {
                    \Storage::disk('public')->delete($event->image_path);
                }

                // Store new image
                $path = $request->file('image')->store('events', 'public');
                $validated['image_path'] = $path;
            }

            // Update the event
            $event->update($validated);

            return response()->json([
                'status' => true,
                'message' => 'Event updated successfully!',
                'event' => $event
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => 'An error occurred while updating the event.',
                'error' => $th->getMessage()
            ], 500);
        }
    }


    // delete event 

    public function eventDestroy($id)
    {
        $event = Event::find($id);
        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        try {
            // Delete image file if exists
            if ($event->image_path && Storage::disk('public')->exists($event->image_path)) {
                Storage::disk('public')->delete($event->image_path);
            }

            $event->delete();
            return response()->json(['message' => 'Event deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error deleting event'], 500);
        }
    }

}
