import { useState } from "react";
import axios from "axios";

export const Signup = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        if (!username || !email || !password) return;
        try {
            const res = await axios.post("http://localhost:8000/signup", {
                username: username,
                email: email,
                password: password
            },
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                })

            console.log(res.data);


            setUsername("");
            setEmail("");
            setPassword("");

        } catch (err: any) {
            console.log(err.response.data);
        }
    }

    return (
        
        <div className="flex flex-col gap-10 text-amber-50" >
             <div>
                <input type="text" placeholder="enter username" onChange={(e) => { setUsername(e.target.value) }} value={username} />
            </div>
            <div>
                <input type="email" placeholder="enter email" onChange={(e) => { setEmail(e.target.value) }} value={email} />
            </div>
            <div>
                <input type="password" placeholder="enter password" onChange={(e) => { setPassword(e.target.value) }} value={password} />
            </div>
            <div>
                <button onClick={handleSubmit}> Signup</button>
            </div>
        </div>
    )
}

export default Signup