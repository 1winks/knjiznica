import React from 'react';
import UserRow from "./UserRow";

const UserTable = ({ users, onDelete }) => {
    return (
        <div className="user-table">
            {users.map(user => (
                <UserRow key={user.id} {...user} onDelete={onDelete}/>
            ))}
        </div>
    );
};

export default UserTable;