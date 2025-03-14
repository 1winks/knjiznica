import React, {useState} from 'react';
import UserHomeComp from "./UserHomeComp";
import UserBooks from "./UserBooks";
import UserOrders from "./UserOrders";
import UserRecommend from "./UserRecommend";

const UserHome = () => {
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
                    <li className={view === "book" ? "active" : ""}
                        onClick={() => handleView("book")}>Books</li>
                    <li className={view === "order" ? "active" : ""}
                        onClick={() => handleView("order")}>Orders</li>
                    <li className={view === "recommend" ? "active" : ""}
                        onClick={() => handleView("recommend")}>Recommendations</li>
                </ul>
            </div>
            <div className="adminContent">
                {view === "home" && <UserHomeComp/>}
                {view === "book" && <UserBooks/>}
                {view === "order" && <UserOrders/>}
                {view === "recommend" && <UserRecommend/>}
            </div>
        </div>
    );
};

export default UserHome;