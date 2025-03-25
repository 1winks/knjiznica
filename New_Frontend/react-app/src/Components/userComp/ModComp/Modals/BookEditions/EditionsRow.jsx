import React from 'react';
import { Check, X } from "lucide-react";

const EditionsRow = ({ id, isbn, available, borrowDate, returnDate,
                         setSelectedEditionId, setUpdateModal, setDeleteModal }) => {
    return (
        <div className="editionsRow">
            <div>{isbn}</div>
            <div>
                {available ? (<Check className="w-5 h-5 text-green-500"/>)
                : (<X className="w-5 h-5 text-red-500"/>)}
            </div>
            <div>{borrowDate ? borrowDate : (<X className="w-5 h-5 text-red-500"/>)}</div>
            <div>{returnDate ? returnDate : (<X className="w-5 h-5 text-red-500"/>)}</div>
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