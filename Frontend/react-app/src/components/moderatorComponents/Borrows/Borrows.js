import React, {useState} from "react";
import "./Borrows.css";
import AllBorrows from "./AllBorrows";
import CurrentBorrows from "./CurrentBorrows";
import LateBorrows from "./LateBorrows";
import AddBorrow from "./AddBorrow";

const Borrows = () => {
    const [activeComponent, setActiveComponent] = useState("AllBorrows");

    const renderContent = () => {
        switch (activeComponent) {
            case "AllBorrows":
                return <AllBorrows />;
            case "CurrentBorrows":
                return <CurrentBorrows />;
            case "LateBorrows":
                return <LateBorrows />;
            case "AddBorrow.js":
                return <AddBorrow />;
            default:
                return <AllBorrows />;
        }
    };

    return (
        <>
            <div className="borrowMenu">
                <button className="renderBorrowsButton" onClick={() => setActiveComponent("AllBorrows")}>View All</button>
                <button className="renderBorrowsButton" onClick={() => setActiveComponent("CurrentBorrows")}>View Current</button>
                <button className="renderBorrowsButton" onClick={() => setActiveComponent("LateBorrows")}>View Late</button>
                <button className="renderBorrowsButton" onClick={() => setActiveComponent("AddBorrow.js")}>Add</button>
            </div>
            <div className="borrowContent">
                {renderContent()}
            </div>
        </>
    );
};

export default Borrows;