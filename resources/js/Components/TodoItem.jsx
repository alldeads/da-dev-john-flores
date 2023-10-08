import React from 'react';

function TodoItem({ todo, handleDeleteTodo, markTodoComplete }) {

    const onDeleteClick = () => {
        handleDeleteTodo(todo.id);
    };

    const onTodoClick = () => {
        if (!todo.is_completed) {
            markTodoComplete(todo.id);
        }
    };
    
    return (
        <li className="flex items-center justify-between gap-x-6 py-5" onClick={onTodoClick}>
            <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                    <p className={`text-sm font-semibold leading-6 text-gray-900 ${todo.is_completed ? 'line-through text-gray-400' : ''}`}>{todo.description}</p>
                </div>
            </div>

            {!todo.deleted_at && (
                <>
                    {todo.is_completed ? (
                        <a href="#" className="rounded-full bg-green-800 px-2.5 py-1 text-xs font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300">Completed</a>
                    ) : (
                        <a href="#" className="rounded-full bg-rose-800 px-2.5 py-1 text-xs font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-black" onClick={onDeleteClick}>Remove</a>
                    )}
                </>
            )}
        </li>
    );
}

export default TodoItem;