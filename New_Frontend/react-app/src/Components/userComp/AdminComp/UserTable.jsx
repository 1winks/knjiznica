import React from 'react';
import UserRow from "./UserRow";

const UserTable = ({ users, onDelete, sortRoles, sortNames, roleSort, nameSort }) => {
    return (
        <div className="user-table">
            <div>
                <button className="sortButton" onClick={sortNames}>
                    Sort By Name {nameSort ? "▲" : "▼"}
                </button>
                <button className="sortButton" onClick={sortRoles}>
                    Sort By Role {roleSort ? "▼" : "▲"}
                </button>
            </div>
            <div className="adminTableHeader">
                <div>Username:</div>
                <div>Role:</div>
                <div className="deleteDiv">Delete:</div>
            </div>
            {users.map(user => (
                <UserRow key={user.id} {...user} onDelete={onDelete}/>
            ))}
        </div>
    );
};

export default UserTable;