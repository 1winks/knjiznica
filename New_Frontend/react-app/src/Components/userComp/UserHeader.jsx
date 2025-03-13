import React from 'react';
import {useNavigate} from "react-router-dom";
import {clearJwt} from "../../Utils/userData";

const UserHeader = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        clearJwt();
        navigate("/");
    }

    return (
        <>
            <div>
                <button className="logoutButton" onClick={handleLogout}>Logout</button>
            </div>
        </>
    );
};

export default UserHeader;