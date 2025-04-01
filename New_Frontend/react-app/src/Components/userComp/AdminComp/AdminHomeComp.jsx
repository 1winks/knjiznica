import React from 'react';
import {getUsernameFromJwt} from "../../../Utils/userData";

const AdminHomeComp = ({ handleView }) => {
    const username = getUsernameFromJwt();
    return (
        <div className="userHomeComp">
            <div className="userHomeHeader">
                <h1>Welcome to Your Administrator account "{username}"</h1>
                <p>Manage and update our Reader and Moderator accounts.</p>
            </div>
            <div className="userHomeBody">
                <div className="link-section">
                    <h2>➕ Add account</h2>
                    <div>
                        <p>Add new moderator and reader accounts.</p>
                    </div>
                    <button className="home-button" onClick={() => handleView("add")}>Create Account</button>
                </div>
                <div className="link-section">
                    <h2>🔍 View accounts</h2>
                    <div>
                        <p>Manage all current readers as well as moderators.</p>
                    </div>
                    <button className="home-button" onClick={() => handleView("view")}>View Accounts</button>
                </div>
            </div>
        </div>
    );
};

export default AdminHomeComp;