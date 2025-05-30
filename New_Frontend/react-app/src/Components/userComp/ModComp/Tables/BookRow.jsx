import React from 'react';

const BookRow = ({ id, title, author, genre, popularity,
                     setUpdateModal, setDeleteModal, setEditionsModal, setSelectedBookId }) => {
    return (
        <div className="bookRow">
            <div>{title}</div>
            <div>{author}</div>
            <div>{genre}</div>
            <div>{popularity}</div>
            <div className="bookRowButtons">
                <button className="edition-btn" onClick={() => {
                    setSelectedBookId(id);
                    setEditionsModal(true);
                }}>
                    Editions
                </button>
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