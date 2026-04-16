import axios from "axios";
import { useState } from "react";

type Todo = {
  id: number;
  title: string;
};

export const InputBox = ({ onAdd }: { onAdd: (todo: Todo) => void }) => {
  const [input, setInput] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async () => {
    if (!input) return;

    try {
      const res = await axios.post("http://localhost:8000/todo", {
        title: input,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log(res.data);

      onAdd(res.data.todo);

      setInput("");


    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error(err.response?.data);
      } else {
        console.error(err);
      }
    }
  };

  return (
    <div className="text-amber-100">
      <input
        placeholder="enter the task"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          console.log(e.target.value);
        }}
      />

      <button onClick={handleSubmit}>Add</button>
    </div>
  );
};

export default InputBox;