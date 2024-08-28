import React, {useState} from "react";
import "./Readers.css";
import AllReaders from "./AllReaders";

const Readers = () => {
    const [activeComponent, setActiveComponent] = useState("AllReaders");

    const renderContent = () => {
        switch (activeComponent) {
            case "AllReaders":
                return <AllReaders />;
            default:
                return <AllReaders />;
        }
    };

    return (
        <>
            <div className="readerMenu">
                <button className="renderReaderButton" onClick={() => setActiveComponent("AllReaders")}>View All</button>
            </div>
            <div className="readerContent">
                {renderContent()}
            </div>
        </>
    );
};

export default Readers;