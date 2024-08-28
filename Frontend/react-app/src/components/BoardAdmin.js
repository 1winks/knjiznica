import React, { useState, useEffect } from "react";

import axios from "axios";
import authHeader from "../services/auth-header";
import UserRoleList from "./adminComponents/UserRoleList";
import AddUserForm from "./adminComponents/AddUserForm";
import "./styles/AdminBoard.css"

const AUTH_URL = "http://localhost:8080/api/auth/";

const BoardAdmin = () => {
  const [userRoles, setUserRoles] = useState([]);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    fetchUserRoles();
  }, [deleted]);

  const handleUpdate = () => {
      console.log("Tu sam 1");
      setDeleted(!deleted);
  }

  const fetchUserRoles = () => {
    axios
        .get(`${AUTH_URL}userroles`, { headers: authHeader() })
        .then((response) => {
          setUserRoles(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the user roles!", error);
        });
  };

  const handleDelete = (userId) => {
    axios
        .delete(`${AUTH_URL}delete/${userId}`, { headers: authHeader() })
        .then((response) => {
            setDeleted(!deleted);
        })
        .catch((error) => {
          console.error("There was an error deleting the user!", error);
        });
  };

  return (
      <div className="containerAdmin">
          <div className="user-role-list">
            <UserRoleList userRoles={userRoles} onDelete={handleDelete} />
          </div>
          <div className="add-user-form">
            <AddUserForm onUpdate={handleUpdate}/>
          </div>
      </div>
  );
};

export default BoardAdmin;
