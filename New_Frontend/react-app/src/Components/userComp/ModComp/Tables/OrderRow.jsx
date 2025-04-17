import React from 'react';
import { Check, X } from "lucide-react";

const OrderRow = ({ orderId, readerId, username, startDate, endDate, returnedDate, izdanjaId,
                  setSelectedOrderId, setEditionsModal, setUpdateModal, setDeleteModal}) => {
    let daysLateString = "";
    let daysLate = 0;
    const today = new Date();
    const end = new Date(endDate);
    if (returnedDate) {
        const returned = new Date(returnedDate);
        daysLate = Math.floor((returned - end) / (1000 * 60 * 60 * 24));
    } else {
        daysLate = Math.floor((today - end) / (1000 * 60 * 60 * 24));
    }
    if (daysLate>0) {
        daysLateString = `(${daysLate} days late)`;
    }

    return (
        <div className="orderRow">
            <div>{username}</div>
            <div className="status-indicator">
                {returnedDate ?
                    (<Check className="icon-green"/>)
                    : (<X className="icon-red"/>)
                }
                {daysLate > 0 && <span className="late-text">{daysLateString}</span>}
            </div>
            <div>{startDate}</div>
            <div>{endDate}</div>
            <div className="orderRowButtons">
                <button className="edition-btn" onClick={() => {
                    setSelectedOrderId(orderId);
                    setEditionsModal(true);
                }}>
                    View
                </button>
                <button className="update-btn" onClick={(   ) => {
                    setSelectedOrderId(orderId);
                    setUpdateModal(true);
                }}>
                    Update
                </button>
                <button className="delete-btn" onClick={() => {
                    setSelectedOrderId(orderId);
                    setDeleteModal(true);
                }}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default OrderRow;