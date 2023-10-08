import TodoApp from '@/Components/TodoApp';
import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />

            <TodoApp></TodoApp>
        </>
    );
}
