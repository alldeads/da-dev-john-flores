<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Todo;

use App\Http\Requests\CreateTodoRequest;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $todos = Todo::withTrashed()->orderBy('is_completed', 'asc')->orderBy('created_at', 'desc')->get();

        return response()->json([
            'todos' => $todos
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateTodoRequest $request)
    {
        $todo = new Todo([
            'description' => $request->input('description'),
        ]);
    
        $todo->save();
    
        return response()->json(['message' => 'Todo created successfully'], 201);
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

        $todo->update(['is_completed' => 1]);

        $todo->delete();
        
        return response()->json(['message' => 'Todo soft deleted']);
    }
}
