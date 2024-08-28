import React from "react";
import getRole from "../RoleHelper";

const UserRole = ({ userRole, onDelete }) => {
    const handleDeleteClick = () => {
        onDelete(userRole.id);
    };

    return (
        <tr>
            <td>{userRole.username}</td>
            <td>{getRole(userRole.role)}</td>
            <td>
                <button className="btn btn-danger" onClick={handleDeleteClick}>
                    -
                </button>
            </td>
        </tr>
    );
};

export default UserRole;
