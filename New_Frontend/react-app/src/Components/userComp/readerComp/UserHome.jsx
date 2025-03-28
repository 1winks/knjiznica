import React, {useState} from 'react';
import UserHomeComp from "./UserHomeComp";
import UserBooks from "./UserBooks";
import UserOrders from "./UserOrders";
import UserRecommend from "./UserRecommend";
import UserReadBooks from "./UserReadBooks";

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
                        onClick={() => handleView("home")}>Home
                    </li>
                    <li className={view === "book" ? "active" : ""}
                        onClick={() => handleView("book")}>Books
                    </li>
                    <li className={view === "mybooks" ? "active" : ""}
                        onClick={() => handleView("mybooks")}>My Books
                    </li>
                    <li className={view === "order" ? "active" : ""}
                        onClick={() => handleView("order")}>My Orders
                    </li>
                    <li className={view === "recommend" ? "active" : ""}
                        onClick={() => handleView("recommend")}>Recommendations
                    </li>
                </ul>
            </div>
            <div className="adminContent">
                {view === "home" && <UserHomeComp/>}
                {view === "book" && <UserBooks/>}
                {view === "mybooks" && <UserReadBooks/>}
                {view === "order" && <UserOrders/>}
                {view === "recommend" && <UserRecommend/>}
            </div>
        </div>
    );
};

export default UserHome;