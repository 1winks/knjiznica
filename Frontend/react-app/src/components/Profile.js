import React from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  const firstRole = currentUser.roles[0];

  const getRole = (role) => {
      let strRole;
      switch (role) {
          case "ROLE_ADMIN":
              strRole = "Admin";
              break;
          case "ROLE_MODERATOR":
              strRole = "Moderator";
              break;
          default:
              strRole = "User";
      }
      return strRole;
  }

  return (
    <div className="container">
        <div className="profileDiv">
            <p className="greetings">Hello {currentUser.username}!</p>
            <p className="redirect">To see more go to: "{getRole(firstRole)} Content".</p>
        </div>
    </div>
  );
};

export default Profile;
