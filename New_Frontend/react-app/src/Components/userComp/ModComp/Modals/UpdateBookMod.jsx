import React from 'react';

const UpdateBookMod = ({closeModal, onUpdate, selectedBookId, findBookById,
                           setInputAuthorValue, setInputGenreValue, inputAuthorValue, inputGenreValue}) => {
    return (
        <div className="updateBookMod modal">
            <div className="modal-content">
                <h2>Update book: {findBookById(selectedBookId).title}</h2>
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
                    <button onClick={() => onUpdate(selectedBookId)}>Save</button>
                    <button onClick={closeModal}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default UpdateBookMod;