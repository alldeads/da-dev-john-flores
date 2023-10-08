import React from 'react';

function TodoItem({ todo, handleDeleteTodo }) {

    const onDeleteClick = () => {
        handleDeleteTodo(todo.id);
    };
    
    return (
        <li className="flex items-center justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">{todo.description}</p>
                </div>
            </div>

            {!todo.deleted_at && (
                <a href="#" className="rounded-full bg-rose-800 px-2.5 py-1 text-xs font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-black" onClick={onDeleteClick}>Remove</a>
            )}
        </li>
    );
}

export default TodoItem;