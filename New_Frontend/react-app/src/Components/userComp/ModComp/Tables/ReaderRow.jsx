import React from 'react';
import {Check, X} from "lucide-react";

const ReaderRow = ({ readerId, username, email, address, phoneNumber, membershipFeeExpiry,
                       onUpdate, onPay, SetSelectedReaderId }) => {
    const today = new Date().toISOString().split("T")[0];
    return (
        <div className="readerRow">
            <div>{username}</div>
            <div>{email}</div>
            <div>{address === null ? "-" : address}</div>
            <div>{phoneNumber === null ? "-" : phoneNumber}</div>
            <div>
                {(membershipFeeExpiry !== null && membershipFeeExpiry > today) ? (
                    <div className="seeEditions">
                        <Check className="w-5 h-5 text-green-500"/>
                        <div>{membershipFeeExpiry}</div>
                    </div>
                ) : (
                    <X className="w-5 h-5 text-red-500"/>
                )}
            </div>
            <div className="bookRowButtons">
                <button className="update-btn" onClick={() => {
                    SetSelectedReaderId(readerId);
                    onUpdate();
                }}>Update
                </button>
                <button className="update-btn" onClick={() => {
                    SetSelectedReaderId(readerId);
                    onPay();
                }}>Renew
                </button>
            </div>
        </div>
    );
};

export default ReaderRow;