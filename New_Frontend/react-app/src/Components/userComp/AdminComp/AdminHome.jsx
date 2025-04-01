import React, {useState} from 'react';
import AdminHomeComp from "./AdminHomeComp";
import AdminAdd from "./AdminAdd";
import AdminView from "./AdminView";

const AdminHome = () => {
    const [ view, setView ] = useState("home");
    function handleView(par) {
        setView(par);
    }

    return (
        <div className="adminHomeContainer">
            <div className="adminNavbar">
                <ul>
                    <li className={view === "home" ? "active" : ""}
                        onClick={() => handleView("home")}>Home</li>
                    <li className={view === "add" ? "active" : ""}
                        onClick={() => handleView("add")} >Add User</li>
                    <li className={view === "view" ? "active" : ""}
                        onClick={() => handleView("view")} >User List</li>
                </ul>
            </div>
            <div className="adminContent">
                {view === "home" && <AdminHomeComp handleView={handleView}/>}
                {view === "add" && <AdminAdd/>}
                {view === "view" && <AdminView/>}
            </div>
        </div>
    );
};

export default AdminHome;