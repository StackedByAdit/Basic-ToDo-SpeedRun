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
        <div className="flex flex-col items-center justify-center p-5 gap-5 text-amber-50
         bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl
         bg-gradient-to-r from-gray-900 to-white-900
         shadow-[0_0_20px_rgba(111,111,111,0.4)]" >
            <div>
                <input className="border-1 hover:scale-110 transition duration-200 active:scale-95 hover:bg-gray-800 rounded-2xl p-5" type="email" placeholder="enter email" onChange={(e) => { setEmail(e.target.value) }} value={email} />
            </div>
            <div>
                <input className="border-1 hover:scale-110 transition duration-200 active:scale-95 hover:bg-gray-800 rounded-2xl p-5" type="password" placeholder="enter password" onChange={(e) => { setPassword(e.target.value) }} value={password} />
            </div>
            <div>
                <button className="border-1 hover:scale-110 transition duration-200 active:scale-95 hover:bg-gray-800 rounded-2xl p-5" onClick={handleSubmit}> Login</button>
            </div>
        </div>
    )
}

export default Login