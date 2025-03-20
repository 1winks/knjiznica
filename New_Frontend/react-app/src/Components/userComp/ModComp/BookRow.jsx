import React from 'react';

const BookRow = ({ id, title, author, genre, setUpdateModal, setDeleteModal, setSelectedBookId }) => {
    return (
        <div className="bookRow">
            <div>{title}</div>
            <div>{author}</div>
            <div>{genre}</div>
            <div className="bookRowButtons">
                <button className="update-btn" onClick={() => {
                    setSelectedBookId(id);
                    setUpdateModal(true);
                }}>
                    Update
                </button>
                <button className="delete-btn" onClick={() => {
                    setSelectedBookId(id);
                    setDeleteModal(true);
                }}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default BookRow;