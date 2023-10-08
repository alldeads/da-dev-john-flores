import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';

function TodoApp() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [selectedTab, setSelectedTab] = useState('all');
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const response = await axios.get('/api/todos');
        setTodos(response.data.todos);
    };

    const addTodo = async () => {
        try {
            await axios.post('/api/todos', { description: newTodo });
            setNewTodo('');
            fetchTodos();

            setMessage('TODO added successfully.');

            setTimeout(() => {
                setMessage('');
            }, 5000);
        } catch (error) {
            setMessage(error);
        }
    };

    const handleDeleteTodo = async (id) => {
        try {
            await axios.delete(`/api/todos/${id}`);
            fetchTodos();
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const markTodoComplete = async (id) => {
        try {
            await axios.put(`/api/todos/${id}`, { is_completed: true });
            fetchTodos();
        } catch (error) {
            console.error('Error marking todo as complete:', error);
        }
    };

    function filterTodos() {
        switch (selectedTab) {
            case 'active':
                return todos.filter((todo) => !todo.is_completed && !todo.deleted_at);
            case 'completed':
                return todos.filter((todo) => todo.is_completed && !todo.deleted_at);
            default:
                return todos;
        }
    }

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };

    return (
        <div className='w-1/2 m-auto p-24'>

            <div className='w-full mb-5'>
                <div className="hidden sm:block">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                            <a href="#" className={`border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700 flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${selectedTab === 'all' ? 'border-indigo-500 text-indigo-600' : ''}`} onClick={() => handleTabClick('all')}>
                                All
                            </a>
                            <a href="#" className={`border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700 flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${selectedTab === 'active' ? 'border-indigo-500 text-indigo-600' : ''}`} onClick={() => handleTabClick('active')}>
                                Active
                            </a>
                            <a href="#" className={`border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700 flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${selectedTab === 'completed' ? 'border-indigo-500 text-indigo-600' : ''}`} onClick={() => handleTabClick('completed')} aria-current="page">
                                Completed
                            </a>
                        </nav>
                    </div>
                </div>
            </div>

            {message && <p className="text-green-500 mb-5 ">{message}</p>}

            <div className='flex'>
                <input 
                    type="text" 
                    name="description" 
                    id="description" 
                    className="flex-1 mr-5 block w-3/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                    placeholder="What is on your mind today?"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />

                <button 
                    type="button" 
                    className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={addTodo}
                >Add</button>
            </div>
            <div>
                <ul role="list" className="divide-y divide-gray-100">
                    {filterTodos().map((todo) => (
                        <TodoItem 
                            key={todo.id} 
                            todo={todo} 
                            handleDeleteTodo={handleDeleteTodo}
                            markTodoComplete={markTodoComplete} 
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default TodoApp;
