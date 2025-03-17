import React from 'react';
import {useNavigate} from "react-router-dom";
import {clearJwt, getUsernameFromJwt} from "../../Utils/userData";

const UserHeader = () => {
    const navigate = useNavigate();

    const username = getUsernameFromJwt();

    const handleLogout = () => {
        clearJwt();
        navigate("/");
    }

    return (
        <div className="userHeader">
            <div>Library</div>
            <div className="logoutName">
                <div>{username}</div>
                <div>
                    <button className="logoutButton" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    );
};

export default UserHeader;