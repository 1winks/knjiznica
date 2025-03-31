import React from 'react';
import UserBooksRow from "./UserBooksRow";

const UserBooksTable = ({ books, alphaSorter, titleSort, authorSort, genreSort, availableSort, sortAvailable,
                        setEditionsMod, SetSelectedBookTitle}) => {
    return (
        <div className="bookTable">
            <div>
                <div className="bookSorters">
                    <button className="sortButton" onClick={() => alphaSorter(titleSort, "title")}>
                        Sort By Title {titleSort ? "▲" : "▼"}
                    </button>
                    <button className="sortButton" onClick={() => alphaSorter(authorSort, "author")}>
                        Sort By Author {authorSort ? "▲" : "▼"}
                    </button>
                    <button className="sortButton" onClick={() => alphaSorter(genreSort, "genre")}>
                        Sort By Genre {genreSort ? "▲" : "▼"}
                    </button>
                    <button className="sortButton" onClick={sortAvailable}>
                        Sort By Availability {availableSort ? "▲" : "▼"}
                    </button>
                </div>
            </div>
            <div className="userAvailableTableHeader">
                <div>Title:</div>
                <div>Author:</div>
                <div>Genre:</div>
                <div>Available:</div>
            </div>
            {books.map(book => (
                <UserBooksRow key={book} {...book}
                              setEditionsMod={setEditionsMod}
                              SetSelectedBookTitle={SetSelectedBookTitle}/>
            ))}
        </div>
    );
};

export default UserBooksTable;