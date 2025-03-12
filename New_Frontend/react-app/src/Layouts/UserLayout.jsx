import React from 'react';
import UserHeader from "../Components/userComp/UserHeader"
import { Outlet } from "react-router-dom";

const UserLayout = () => {
    return (
        <>
            <UserHeader />
            <Outlet />
        </>
    );
};

export default UserLayout;