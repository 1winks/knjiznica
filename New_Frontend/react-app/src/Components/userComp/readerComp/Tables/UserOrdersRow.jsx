import React from 'react';
import {Check, X} from "lucide-react";

const UserOrdersRow = ({ startDate, endDate, returnedDate, izdanja,
                           setBooksModal, setSelectedEditions, setSelectedStart}) => {
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
        <div className="userOrderRow">
            <div>{startDate}</div>
            <div>{endDate}</div>
            <div>
                {returnedDate ?
                    (<Check className="w-5 h-5 text-green-500"/>)
                    : (<X className="w-5 h-5 text-red-500"/>)
                }
                {daysLate > 0 && ` ${daysLateString}`}
            </div>
            <div className="seeEditions">
                <button className="seeEditionsLink" onClick={() => {
                    setSelectedEditions(izdanja);
                    setSelectedStart(startDate);
                    setBooksModal(true);
                }}>
                    View
                </button>
            </div>
        </div>
    );
};

export default UserOrdersRow;