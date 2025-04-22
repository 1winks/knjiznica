import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import Footer from "./Footer";
import PopupError from "../userComp/PopupError";

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [errorModal, setErrorModal] = useState(false);

    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    async function handleSubmit(e) {
        e.preventDefault();

        if (!email || !password || !username) {
            setErrorMessage('Please fill in all fields.');
            return;
        }
        if (username.length<3 || username.length>20) {
            setErrorMessage('Username size must be between 3 and 20');
            setErrorModal(true);
            return;
        }
        if (password.length<6 || password.length>40) {
            setErrorMessage('Password size must be between 6 and 40');
            setErrorModal(true);
            return;
        }
        setErrorMessage('');
        const userData = { username, email, password };

        try {
            const response = await fetch(`http://localhost:8080/api/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Registration failed. Please check your credentials.");
            }
            alert("Registration successful!");
            navigate("/login");
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
                <h2>Register</h2>
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
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleEmailChange}
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
                    <button type="submit">Register</button>
                </form>
            </div>
            {errorModal && <PopupError errorText={errorMessage} closeErrorModal={closeErrorModal}/>}
            <Footer/>
        </div>
    );
};

export default Register;