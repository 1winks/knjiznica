import React from 'react';
import { Check, X } from "lucide-react";

const OrderRow = ({ orderId, readerId, username, startDate, endDate, returnedDate, izdanjaId,
                  setSelectedOrderId, setEditionsModal, setUpdateModal, setDeleteModal}) => {
    return (
        <div className="orderRow">
            <div>{username}</div>
            <div>
                {returnedDate ?
                    (<Check className="w-5 h-5 text-green-500"/>)
                    : (<X className="w-5 h-5 text-red-500"/>)}
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