import React from 'react';
import UserHeader from "../Components/userComp/UserHeader"
import { Outlet } from "react-router-dom";

const UserLayout = () => {
    return (
        <div className="userScreen">
            <UserHeader />
            <Outlet />
        </div>
    );
};

export default UserLayout;