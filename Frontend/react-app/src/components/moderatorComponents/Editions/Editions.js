import React, {useState} from "react";
import AllEditions from "./AllEditions";
import BorrowedEditions from "./BorrowedEditions";
import LateEditions from "./LateEditions";
import AddEdition from "./AddEdition";
import "./Editions.css";

const Editions = () => {
    const [activeComponent, setActiveComponent] = useState("AllEditions");

    const renderContent = () => {
        switch (activeComponent) {
            case "AllEditions":
                return <AllEditions />;
            case "BorrowedEditions":
                return <BorrowedEditions />;
            case "LateEditions":
                return <LateEditions />;
            case "AddEdition.js":
                return <AddEdition />;
            default:
                return <AllEditions />;
        }
    };

    return (
        <>
            <div className="editionMenu">
                <button className="renderEditionButton" onClick={() => setActiveComponent("AllEditions")}>View All</button>
                <button className="renderEditionButton" onClick={() => setActiveComponent("BorrowedEditions")}>View Borrowed</button>
                <button className="renderEditionButton" onClick={() => setActiveComponent("LateEditions")}>View Late</button>
                <button className="renderEditionButton" onClick={() => setActiveComponent("AddEdition.js")}>Add</button>
            </div>
            <div className="editionContent">
                {renderContent()}
            </div>
        </>
    );
};

export default Editions;