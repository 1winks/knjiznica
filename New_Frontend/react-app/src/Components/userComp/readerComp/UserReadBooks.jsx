import React from 'react';
import {getUsernameFromJwt} from "../../../Utils/userData";

const UserReadBooks = () => {
    const username = getUsernameFromJwt();
    return (
        <div>
            {username}
        </div>
    );
};

export default UserReadBooks;