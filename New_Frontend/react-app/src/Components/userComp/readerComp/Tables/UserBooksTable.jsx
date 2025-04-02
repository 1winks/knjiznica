import React from 'react';
import UserBooksRow from "./UserBooksRow";

const UserBooksTable = ({ books, alphaSorter, titleSort, authorSort, genreSort,
                            availableSort, sortAvailable, popularitySort, sortByPopularity,
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
                    <button className="sortButton" onClick={sortByPopularity}>
                        Sort By Popularity {popularitySort ? "▲" : "▼"}
                    </button>
                </div>
            </div>
            <div className="userAvailableTableHeader">
                <div>Title:</div>
                <div>Author:</div>
                <div>Genre:</div>
                <div>Popularity:</div>
                <div>Available:</div>
            </div>
            {books.map((book, index) => (
                <UserBooksRow key={index} {...book}
                              setEditionsMod={setEditionsMod}
                              SetSelectedBookTitle={SetSelectedBookTitle}/>
            ))}
        </div>
    );
};

export default UserBooksTable;