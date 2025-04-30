import React, {useEffect, useState} from 'react';
import {getJwt} from "../../Utils/userData.js";
import UserHome from "./readerComp/UserHome";
import ModeratorHome from "./ModComp/ModeratorHome";
import AdminHome from "./AdminComp/AdminHome";

const apiUrl = process.env.REACT_APP_API_URL;

const Home = () => {
    const [role, setRole] = useState("");

    useEffect( () => {
        fetch(`${apiUrl}/api/auth/profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getJwt()}`,
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            return response.json();
        }).then(data => {
            setRole(data.role)
        }).catch(error => {
            console.error('Error:', error)
        })
    }, []);

    return (
        <div className="homeContainer">
            {role === "ROLE_ADMIN" && <AdminHome />}
            {role === "ROLE_MODERATOR" && <ModeratorHome />}
            {role === "ROLE_USER" && <UserHome />}
        </div>
    );
};

export default Home;