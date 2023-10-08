<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Todo;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $todos = Todo::all();

        return response()->json([
            'todos' => $todos
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
        ]);
    
        $todo = new Todo([
            'title' => $request->input('title'),
        ]);
    
        $todo->save();
    
        return response()->json(['message' => 'Todo created successfully'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $todo = Todo::withTrashed()->find($id);

        if (!$todo) {
            return response()->json(['message' => 'Todo not found'], 404);
        }

        if ($todo->trashed()) {
            $todo->forceDelete(); // Permanently delete if already soft deleted
            return response()->json(['message' => 'Todo permanently deleted']);
        } else {
            $todo->delete(); // Soft delete
            return response()->json(['message' => 'Todo soft deleted']);
        }
    }
    }
