import { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

export const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        if (!email || !password) return;
        try {
            const res = await axios.post("http://localhost:8000/signin", {
                email: email,
                password: password
            },
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
            console.log(res.data);


            const token = res.data.token;

            console.log(token);

            localStorage.setItem("token", token)

            navigate("/todos");

            setEmail("");
            setPassword("");

        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                console.error(err.response?.data);
            } else {
                console.error(err);
            }
        }
    }

    return (
        <div className="flex flex-col gap-10 text-amber-50" >
            <div>
                <input type="email" placeholder="enter email" onChange={(e) => { setEmail(e.target.value) }} value={email} />
            </div>
            <div>
                <input type="password" placeholder="enter password" onChange={(e) => { setPassword(e.target.value) }} value={password} />
            </div>
            <div>
                <button onClick={handleSubmit}> Login</button>
            </div>
        </div>
    )
}

export default Login