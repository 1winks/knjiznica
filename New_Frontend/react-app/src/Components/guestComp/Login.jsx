import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    async function handleSubmit(e) {
        e.preventDefault();

        if (!password || !username) {
            setErrorMessage('Please fill in both fields.');
            return;
        }

        setErrorMessage('');
        try {
            const response = await fetch(`http://localhost:8080/api/auth/signin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error("Login failed. Please check your credentials.");
            }

            const data = await response.json();
            console.log("Login successful:", data);
            localStorage.setItem("userData", JSON.stringify(data));
            navigate("/home");
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

        return (
            <div className="formContainer">
                <div className="homeButton"><Link className="link" to="/">Back to Home</Link></div>
                <div className="registerForm">
                    <h2>Login</h2>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username">Username</label>
                            <input
                                type="username"
                                id="username"
                                name="username"
                                value={username}
                                onChange={handleUsernameChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                        </div>
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        );
}

export default Login;