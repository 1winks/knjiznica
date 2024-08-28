import React from "react";
import UserRole from "./UserRole";

const UserRoleList = ({ userRoles, onDelete }) => {
    return (
        <>
            <h2>User Roles</h2>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {userRoles.map((userRole) => (
                    <UserRole
                        key={userRole.id}
                        userRole={userRole}
                        onDelete={onDelete}
                    />
                ))}
                </tbody>
            </table>
        </>
    );
};

export default UserRoleList;
