import React from 'react';

const EditionsRow = ({ id, isbn, available, borrowDate, returnDate,
                         setSelectedEditionId, setUpdateModal, setDeleteModal }) => {
    return (
        <div className="editionsRow">
            <div>{isbn}</div>
            <div>{available ? "Yes" : "No"}</div>
            <div>{borrowDate ? borrowDate : "X"}</div>
            <div>{returnDate ? returnDate : "X"}</div>
            <div className="bookRowButtons">
                <button className="update-btn" onClick={() => {
                    setSelectedEditionId(id);
                    setUpdateModal(true);
                }}>
                    Update
                </button>
                <button className="delete-btn" onClick={() => {
                    setSelectedEditionId(id);
                    setDeleteModal(true);
                }}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default EditionsRow;