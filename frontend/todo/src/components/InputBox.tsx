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
    <div className="flex flex-row items-center justify-center p-5 gap-5 text-amber-50
         bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl
         bg-gradient-to-r from-gray-900 to-white-900
         shadow-[0_0_20px_rgba(111,111,111,0.4)]">
      <input className="border-1 hover:scale-110 transition duration-200 active:scale-95 hover:bg-gray-800 rounded-2xl p-5"
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