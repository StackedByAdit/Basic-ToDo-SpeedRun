import { useEffect, useState } from 'react'
import InputBox from '../InputBox'
import axios from 'axios'

export const Todos = () => {

    const token = localStorage.getItem("token")
    const [todos, setTodos] = useState([]);

    useEffect(() => {
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

        fetchTodos();
    }, []);

    return (
        <div className="text-amber-100 flex flex-col gap-5">
            <div>
                <InputBox />
            </div>

            <div className='flex flex-col gap-5'>
                {todos.map((todo: any) => (
                    <div key={todo.id}>
                        {todo.title}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Todos;