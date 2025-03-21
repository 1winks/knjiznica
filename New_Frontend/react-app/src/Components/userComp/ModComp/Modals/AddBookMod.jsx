import React from 'react';

const AddBookMod = ({closeModal, formError, onAdd, findBookById,
                        setInputTitleValue, setInputAuthorValue, setInputGenreValue,
                        inputTitleValue, inputAuthorValue, inputGenreValue}) => {
    return (
        <div className="addBookMod modal">
            <div className="modal-content">
                <h2>Add a Book</h2>
                {formError && <div style={{color: "red"}}>{formError}</div>}
                <div className="labels">
                    <label>Title:</label>
                    <input type="text" value={inputTitleValue}
                           placeholder={findBookById()?.title || "Enter title"}
                           onChange={(e) =>
                               setInputTitleValue(e.target.value)}/>
                </div>
                <div className="labels">
                    <label>Author:</label>
                    <input type="text" value={inputAuthorValue}
                           placeholder={findBookById()?.author || "Enter author"}
                           onChange={(e) =>
                               setInputAuthorValue(e.target.value)}/>
                </div>
                <div className="labels">
                    <label>Genre:</label>
                    <input type="text" value={inputGenreValue}
                           placeholder={findBookById()?.genre || "Enter genre"}
                           onChange={(e) =>
                               setInputGenreValue(e.target.value)}/>
                </div>
                <div className="modal-buttons">
                    <button onClick={() => onAdd()}>Create</button>
                    <button onClick={closeModal}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default AddBookMod;