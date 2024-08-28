import React, { useState } from 'react';
import axios from 'axios';
import authHeader from "../../services/auth-header";
import "../styles/AddUserForm.css";

const AUTH_URL = "http://localhost:8080/api/auth/admin/signup";

const AddUserForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [passwordError, setPasswordError] = useState('');
    const [usernameError, setUsernameError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (username.length < 3 || username.length > 20) {
            setUsernameError('The username must be between 3 and 20 characters.');
            return;
        }
        if (password.length < 6 || password.length > 40) {
            setPasswordError('Password must be between 6 and 40 characters long.');
            return;
        }
        setPasswordError('');
        const userData = {
            username,
            email,
            password,
            role: [role]
        };
        axios.post(AUTH_URL, userData, { headers: authHeader() })
            .then((response) => {
                console.log("User created successfully!", response.data);
                setUsername('');
                setEmail('');
                setPassword('');
                setRole('user');
            })
            .catch((error) => {
                console.error("There was an error creating the user!", error);
            });
    };

    return (
        <div className="add-user-form-inner">
            <h2>Add User</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    {usernameError && <div className="error-message">{usernameError}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {passwordError && <div className="error-message">{passwordError}</div>}
                </div>
                <div className="form-group">
                    <label>Role:</label>
                    <div>
                        <label>
                            <input
                                type="radio"
                                value="user"
                                checked={role === 'user'}
                                onChange={(e) => setRole(e.target.value)}
                            />
                            User
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="mod"
                                checked={role === 'mod'}
                                onChange={(e) => setRole(e.target.value)}
                            />
                            Moderator
                        </label>
                    </div>
                </div>
                <button type="submit">Add User</button>
            </form>
        </div>
    );
};

export default AddUserForm;
