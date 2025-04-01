import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {getJwt} from "../../../Utils/userData";

const AdminAdd = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState("user");
    const [errorMessage, setErrorMessage] = useState('');

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

    const handleButtonChange = (e) => {
        setRole(e.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault();

        if (!email || !password || !username) {
            setErrorMessage('Please fill in all fields.');
            return;
        }
        if (password.length<6 || password.length>40) {
            setErrorMessage('Password size must be between 6 and 40');
            return;
        }

        setErrorMessage('');
        const userData = {
            username,
            email,
            password,
            role: [role]
        };

        fetch(`http://localhost:8080/api/auth/admin/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getJwt() }`
            },
            body: JSON.stringify(userData),
        })
            .then(response => response.json())
            .then(data => {
                setUsername('');
                setEmail('');
                setPassword('');
                setRole('user')
                role === "mod" ? alert("Moderator added!") : alert("User added!");
            })
            .catch(error => {
                console.error('Error:', error);
                setErrorMessage('Something went wrong. Please try again.');
            });
    }

    return (
        <div className="adminAdd">
            <div className="registerForm adminRegisterForm">
                <h2>Add User</h2>
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
                    <div className="radio">
                        <label>
                            <input
                                type="radio"
                                name="role"
                                value="user"
                                checked={role === "user"}
                                onChange={handleButtonChange}
                            />
                            User
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="role"
                                value="mod"
                                checked={role === "mod"}
                                onChange={handleButtonChange}
                            />
                            Moderator
                        </label>
                    </div>
                    <button type="submit">Add</button>
                </form>
            </div>
        </div>
    );
};

export default AdminAdd;