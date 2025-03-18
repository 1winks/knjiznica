import React from 'react';

const ReaderRow = ({readerId, username, email, address, phoneNumber, onUpdate}) => {
    return (
        <div className="readerRow">
            <div>{username}</div>
            <div>{email}</div>
            <div>{address === null ? "-" : address}</div>
            <div>{phoneNumber === null ? "-" : phoneNumber}</div>
            <div>
                <button className="update-btn" onClick={() => onUpdate(readerId)}>Update</button>
            </div>
        </div>
    );
};

export default ReaderRow;