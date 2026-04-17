import { useEffect, useState } from 'react'
import InputBox from '../InputBox'
import axios from 'axios'
import DeleteButton from '../DeleteButton'

type Todo = {
    id: number;
    title: string;
};

export const Todos = () => {

    const token = localStorage.getItem("token") || "";
    const [todos, setTodos] = useState<Todo[]>([]);

    const fetchTodos = async () => {
        try {
            const res = await axios.get("http://localhost:8000/todos", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setTodos(res.data.todos);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, [token]);

    return (
        <div className="text-amber-100 flex flex-col gap-5">
            <div>
                <InputBox onAdd={fetchTodos} />
            </div>

            <div className='flex flex-col gap-5'>
                {todos.map((todo: Todo) => (
                    <div className='flex items-center justify-between bg-gray-800 text-white px-4 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200' key={todo.id}>
                        {todo.title}

                        <DeleteButton
                            id={todo.id}
                            onDelete={() => {
                                setTodos(prev => prev.filter(t => t.id !== todo.id));
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Todos;