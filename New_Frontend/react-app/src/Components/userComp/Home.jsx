import React from 'react';
import { getUserData, getJwt } from "../../Utils/userData.js";

const Home = () => {
    const userData = getUserData();
    const jwt = getJwt();

    return (
        <>
            <header>User Page lolpaulo gaming</header>
            <main>
                <div>{Object.entries(userData)}</div>
                <div>{Object.entries(jwt)}</div>
            </main>
        </>
    );
};

export default Home;