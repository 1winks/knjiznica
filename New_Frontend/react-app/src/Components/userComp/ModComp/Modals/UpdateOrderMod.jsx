import React from 'react';
import { X } from "lucide-react";


const UpdateOrderMod = ({ closeModal, selectedOrderId, onUpdate, returnDate, setReturnDate,
                            findOrderById, formError }) => {
    const orderReturnDate = findOrderById(selectedOrderId).returnedDate;
    const username = findOrderById(selectedOrderId).username;

    return (
        <div className="updateBookMod modal">
            <div className="modal-content orderUpdateModal">
                <h2>Update {username}'s order:</h2>
                {formError && <div style={{color: "red"}}>{formError}</div>}
                <label>
                    Current return date:
                </label>
                <label>
                    {orderReturnDate ? orderReturnDate :
                        (<X className="w-5 h-5 text-red-500"/>)}
                </label>
                <div className="labels">
                    <label>New return date:</label>
                    <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                    />
                </div>
                <div className="modal-buttons">
                    <button onClick={() => onUpdate(selectedOrderId)}>Save</button>
                    <button onClick={closeModal}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default UpdateOrderMod;