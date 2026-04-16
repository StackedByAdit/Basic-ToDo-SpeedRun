import axios from "axios";
import { useState } from "react";

export const InputBox = () => {
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

      setInput("");
    } catch (err: any) {
      console.error(err.response.data);
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