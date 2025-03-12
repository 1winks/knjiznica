import React, {useState} from 'react';
import {Link} from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault();

        if (!email || !password || !username) {
            setErrorMessage('Please fill in all fields.');
            return;
        }

        setErrorMessage('');
        const userData = { username, email, password };

        fetch(`http://localhost:8080/api/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert("Registration successful!");
                setUsername('');
                setEmail('');
                setPassword('');
            })
            .catch(error => {
                console.error('Error:', error);
                setErrorMessage('Something went wrong. Please try again.');
            });
    }
    return (
        <div className="formContainer">
            <div className="homeButton"><Link className="link" to="/">Back to Home</Link></div>
            <div className="registerForm">
                <h2>Register</h2>
                {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
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
                        <label htmlFor="email">Email</label>
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
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;