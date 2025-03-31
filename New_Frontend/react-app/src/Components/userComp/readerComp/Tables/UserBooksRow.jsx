import React from 'react';
import {Check, X} from "lucide-react";

const UserBooksRow = ({ title, author, genre, available, SetSelectedBookTitle, setEditionsMod}) => {
    return (
        <div className="userAvailableBookRow">
            <div>{title}</div>
            <div>{author}</div>
            <div>{genre}</div>
            <div className="seeEditions">
                {available ? (<Check className="w-5 h-5 text-green-500"/>)
                : (<X className="w-5 h-5 text-red-500"/>)}
                <button className="seeEditionsLink" onClick={() => {
                    SetSelectedBookTitle(title);
                    setEditionsMod(true);
                }}>
                    Editions
                </button>
            </div>
        </div>
    );
};

export default UserBooksRow;