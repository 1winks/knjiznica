import React from 'react';
import {Check, X} from "lucide-react";

const UserEditionsRow = ({ isbn, available, returnDate}) => {
    return (
        <div className="userAvailableEditionRow">
            <div>{isbn}</div>
            <div>
                {available ? (
                    <Check className="w-5 h-5 text-green-500"/>
                ) : (
                    <div className="seeEditions">
                        <X className="w-5 h-5 text-red-500"/>
                        <div>{returnDate}</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserEditionsRow;