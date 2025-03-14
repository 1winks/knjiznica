import React, {useState} from 'react';
import ModHomeComp from "./ModHomeComp";
import ModBooks from "./ModBooks";
import ModOrders from "./ModOrders";
import ModReaders from "./ModReaders";

const ModeratorHome = () => {
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
                    <li className={view === "reader" ? "active" : ""}
                        onClick={() => handleView("reader")}>Readers</li>
                </ul>
            </div>
            <div className="adminContent">
                {view === "home" && <ModHomeComp/>}
                {view === "book" && <ModBooks/>}
                {view === "order" && <ModOrders/>}
                {view === "reader" && <ModReaders/>}
            </div>
        </div>
    );
};

export default ModeratorHome;