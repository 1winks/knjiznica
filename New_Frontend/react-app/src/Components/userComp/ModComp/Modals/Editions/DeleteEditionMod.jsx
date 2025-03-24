import React from 'react';

const DeleteEditionMod = ({closeEditionModal, selectedEditionId, onDelete}) => {
    return (
        <div className="deleteBookMod modal">
            <div className="modal-content">
                <h2>Are you sure you want to delete this edition?</h2>
                <div className="modal-buttons">
                    <button className="delete-btn2"
                            onClick={() => onDelete(selectedEditionId)}>
                        Delete
                    </button>
                    <button onClick={closeEditionModal}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteEditionMod;