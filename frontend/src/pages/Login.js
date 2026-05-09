import { useState } from "react";

import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const handleLogin = (e) => {

        e.preventDefault();

        if (!email || !password) {

            alert("Please enter email and password");

            return;

        }

        if (
            email === "admin@example.com" &&
            password === "password123"
        ) {

            localStorage.setItem("isLoggedIn", "true");

            navigate("/dashboard");

        } else {

            alert("Invalid credentials");

        }

    };

    return (

        <div className="login-container">

            <h1>CRM Login</h1>

            <form onSubmit={handleLogin}>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">
                    Login
                </button>

            </form>

            <p>
                Demo Login:
            </p>

            <small>
                admin@example.com
            </small>

            <br />

            <small>
                password123
            </small>

        </div>

    );

}

export default Login;