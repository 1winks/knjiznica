import React from 'react';
import UserRow from "./UserRow";

const UserTable = ({ users, onDelete, sortRoles, sortNames, roleSort, nameSort, SetSelectedUserId }) => {
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
                <div>Actions:</div>
            </div>
            {users.map(user => (
                <UserRow key={user.id} {...user}
                         onDelete={onDelete} SetSelectedUserId={SetSelectedUserId}/>
            ))}
        </div>
    );
};

export default UserTable;