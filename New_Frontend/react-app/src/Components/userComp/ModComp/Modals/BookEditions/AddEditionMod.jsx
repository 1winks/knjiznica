import React, {useState} from 'react';
import PopupError from "../../../PopupError";

const AddEditionMod = ({ closeEditionModal, onAdd, inputISBNValue, setInputISBNValue }) => {
    return (
        <div className="addBookMod modal">
            <div className="modal-content">
                <h2>Add an edition</h2>
                <div className="labels">
                    <label>ISBN:</label>
                    <input type="text" value={inputISBNValue}
                           placeholder={"Enter isbn"}
                           onChange={(e) =>
                               setInputISBNValue(e.target.value)}/>
                </div>
                <div className="modal-buttons">
                    <button onClick={() => onAdd()}>Create</button>
                    <button onClick={closeEditionModal}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default AddEditionMod;