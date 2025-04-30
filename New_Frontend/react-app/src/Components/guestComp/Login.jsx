import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import Footer from "./Footer";
import PopupError from "../userComp/PopupError";

const apiUrl = process.env.REACT_APP_API_URL;

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [errorModal, setErrorModal] = useState(false);

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
            const response = await fetch(`${apiUrl}/api/auth/signin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error("Login failed. Please check your credentials.");
            }

            const data = await response.json();
            const jwt = data.accessToken;
            localStorage.setItem("jwt", jwt);
            navigate("/home");
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage(error.message);
            setErrorModal(true);
        }
    }

    const closeErrorModal = () => {
        setErrorMessage("");
        setErrorModal(false);
    }

        return (
                <div className="formContainer">
                    <div className="homeButton"><Link className="link" to="/">Back to Home</Link></div>
                    <div className="registerForm">
                        <h2>Login</h2>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username">Username:</label>
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
                                <label htmlFor="password">Password:</label>
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
                    {errorModal && <PopupError errorText={errorMessage} closeErrorModal={closeErrorModal}/>}
                    <Footer/>
                </div>
        );
}

export default Login;