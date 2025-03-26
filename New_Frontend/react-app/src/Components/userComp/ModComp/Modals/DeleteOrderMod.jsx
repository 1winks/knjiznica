import React from 'react';

const DeleteOrderMod = ({ closeModal, selectedOrderId, onDelete }) => {
    return (
        <div className="deleteBookMod modal">
            <div className="modal-content">
                <h2>Are you sure you want to delete this order?</h2>
                <div className="modal-buttons">
                    <button className="delete-btn2"
                            onClick={() => onDelete(selectedOrderId)}>
                        Delete
                    </button>
                    <button onClick={closeModal}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteOrderMod;