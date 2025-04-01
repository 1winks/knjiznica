import React from 'react';
import ReaderRow from "./ReaderRow";

const ReaderTable = ({ readers, sortNames, nameSort, sortEmails, emailSort,
                         onUpdate, onPay, SetSelectedReaderId }) => {
    return (
        <div className="readerTable">
            <div>
                <button className="sortButton" onClick={sortNames}>
                    Sort By Name {nameSort ? "▲" : "▼"}
                </button>
                <button className="sortButton" onClick={sortEmails}>
                    Sort By E-mail {emailSort ? "▲" : "▼"}
                </button>
            </div>
            <div className="readerTableHeader">
                <div>Username:</div>
                <div>Email:</div>
                <div>Address:</div>
                <div>Phone-number:</div>
                <div>Membership:</div>
                <div>Actions:</div>
            </div>
            {readers.map(reader => (
                <ReaderRow key={reader.readerId} {...reader}
                           onUpdate={onUpdate} onPay={onPay}
                           SetSelectedReaderId={SetSelectedReaderId}
                />
            ))}
        </div>
    );
};

export default ReaderTable;