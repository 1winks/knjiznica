import React from 'react';
import { getJwt, getUsernameFromJwt } from "../../Utils/userData.js";

const Home = () => {
    const jwt = getJwt()
    const username = getUsernameFromJwt();

    return (
        <>
            <div>
                <div>Username: {username}</div>
            </div>
        </>
    );
};

export default Home;