import React from 'react';

const UserRow = ({username, role, id, onDelete}) => {
    return (
        <div className="user-row">
            <div className="user-info">{username}</div>
            <div className="user-info">{role==="ROLE_MODERATOR" ? "moderator" : "user"}</div>
            <button className="delete-btn" onClick={() => onDelete(id)}>Delete</button>
        </div>
    );
};

export default UserRow;