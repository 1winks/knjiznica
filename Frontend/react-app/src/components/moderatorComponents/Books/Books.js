import React, {useState} from "react";
import ViewBooks from "./ViewBooks";
import AddBook from "./AddBook";
import "./Books.css";

const Books = () => {
    const [activeComponent, setActiveComponent] = useState("");

    const renderContent = () => {
        switch (activeComponent) {
            case "ViewBooks":
                return <ViewBooks />;
            case "AddBook":
                return <AddBook />;
            default:
                return <ViewBooks />;
        }
    };

    return (
        <>
            <div className="bookMenu">
                <button className="renderBookButton" onClick={() => setActiveComponent("ViewBooks")}>View All</button>
                <button className="renderBookButton" onClick={() => setActiveComponent("AddBook")}>Add</button>
            </div>
            <div className="bookContent">
                {renderContent()}
            </div>
        </>
    );
};

export default Books;