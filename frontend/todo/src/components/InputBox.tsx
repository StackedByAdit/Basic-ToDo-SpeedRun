import axios from "axios";
import { useState } from "react";

export const InputBox = () => {
  const [input, setInput] = useState("");

  const handleSubmit = async () => {
    if (!input) return;

    try {
      await axios.post("http://localhost:8000/todo", {
        text: input,
      });

      setInput("");
    } catch (err) {
      console.error(err);
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