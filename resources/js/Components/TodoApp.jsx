import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TodoApp() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const response = await axios.get('/api/todos');
        setTodos(response.data.todos);
    };

    const addTodo = async () => {
        await axios.post('/api/todos', { description: newTodo });
        setNewTodo('');
        fetchTodos();
    };

    return (
        <div>
            <h1>TODO App</h1>
            <div>
                <input
                    type="text"
                    placeholder="New Todo"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />

                <button onClick={addTodo}>Add</button>
            </div>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>{todo.description}</li>
                ))}
            </ul>
        </div>
    );
}

export default TodoApp;
