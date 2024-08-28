import React, { useState, useEffect } from "react";
import "./styles/ModBoard.css";
import Books from "./moderatorComponents/Books/Books";
import Editions from "./moderatorComponents/Editions/Editions";
import Borrows from "./moderatorComponents/Borrows/Borrows";
import Readers from "./moderatorComponents/Readers/Readers";

const BoardModerator = () => {
  const [activeComponent, setActiveComponent] = useState("Books");

  const renderContent = () => {
    switch (activeComponent) {
      case "Books":
        return <Books />;
      case "Editions":
        return <Editions />;
      case "Borrows":
        return <Borrows />;
      case "Readers":
        return <Readers />;
      default:
        return <Books />;
    }
  };

  return (
    <div className="containerMod">
      <div className="modMenu">
        <button className="renderButton" onClick={() => setActiveComponent("Books")}>Books</button>
        <button className="renderButton" onClick={() => setActiveComponent("Editions")}>Editions</button>
        <button className="renderButton" onClick={() => setActiveComponent("Borrows")}>Borrows</button>
        <button className="renderButton" onClick={() => setActiveComponent("Readers")}>Readers</button>
      </div>
      <div className="modContent">
        {renderContent()}
      </div>
    </div>
  );
};

export default BoardModerator;
