import React from 'react';

const DeleteBookMod = ({closeModal, selectedBookId, onDelete}) => {
    return (
        <div className="deleteBookMod modal">
            <div className="modal-content">
                <h2>Are you sure you want to delete this book?</h2>
                <div className="modal-buttons">
                    <button className="delete-btn2"
                            onClick={() => onDelete(selectedBookId)}>
                        Delete
                    </button>
                    <button onClick={closeModal}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteBookMod;