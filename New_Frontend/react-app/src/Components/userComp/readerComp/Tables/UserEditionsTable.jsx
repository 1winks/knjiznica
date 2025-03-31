import React from 'react';
import UserEditionsRow from "./UserEditionsRow";

const UserEditionsTable = ({ editions, isbnSort, availabilitySort, sortIsbn, sortAvailable }) => {
    return (
        <div className="bookTable">
            <div>
                <div className="bookSorters">
                    <button className="sortButton" onClick={sortIsbn}>
                        Sort By ISBN {isbnSort ? "▲" : "▼"}
                    </button>
                    <button className="sortButton" onClick={sortAvailable}>
                        Sort By Availability {availabilitySort ? "▲" : "▼"}
                    </button>
                </div>
            </div>
            <div className="userEditionsTableHeader">
                <div>ISBN:</div>
                <div>Available:</div>
            </div>
            {editions.map(book => (
                <UserEditionsRow key={book} {...book}/>
            ))}
        </div>
    );
};

export default UserEditionsTable;