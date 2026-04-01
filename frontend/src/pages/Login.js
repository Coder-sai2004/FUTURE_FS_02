import React, { useState } from "react";
import axios from "axios";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {

            const res = await axios.post(
                "https://mini-crm-backend-3gq3.onrender.com/api/auth/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem("token", res.data.token);

            alert("Login Successful");

            window.location.href = "/dashboard";

        } catch (error) {
            alert("Invalid login");
        }
    };

    return (

        <div className="login-page">

            <h1 className="app-title">Mini CRM</h1>

            <div className="login-container">

                <h2 className="login-title">
                    Admin Login
                </h2>

                <input
                    className="login-input"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="login-input"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    className="login-button"
                    onClick={handleLogin}
                >
                    Login
                </button>

            </div>

        </div>

    );
}

export default Login;