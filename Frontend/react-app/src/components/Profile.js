import React from "react";
import AuthService from "../services/auth.service";
import getRole from "./RoleHelper";
import './styles/Profile.css';

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  const firstRole = currentUser.roles[0];

  return (
    <div className="profileContainer">
        <div className="profileDiv">
            <p className="greetings">Hello {currentUser.username}!</p>
            <p className="redirect">To see more go to: "{getRole(firstRole)} Content".</p>
        </div>
    </div>
  );
};

export default Profile;
