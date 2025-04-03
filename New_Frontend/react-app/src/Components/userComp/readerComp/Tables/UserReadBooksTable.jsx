import React from 'react';
import UserReadBooksRow from "./UserReadBooksRow";

const UserReadBooksTable = ({ books, alphaSorter, titleSort, authorSort, genreSort, isbnSort, sortByISBN }) => {
    return (
        <div className="bookTable">
            <div>
                <div className="bookSorters">
                    <button className="sortButton" onClick={sortByISBN}>
                        Sort By ISBN {isbnSort ? "▲" : "▼"}
                    </button>
                    <button className="sortButton" onClick={() => alphaSorter(titleSort, "title")}>
                        Sort By Title {titleSort ? "▲" : "▼"}
                    </button>
                    <button className="sortButton" onClick={() => alphaSorter(authorSort, "author")}>
                        Sort By Author {authorSort ? "▲" : "▼"}
                    </button>
                    <button className="sortButton" onClick={() => alphaSorter(genreSort, "genre")}>
                        Sort By Genre {genreSort ? "▲" : "▼"}
                    </button>
                </div>
            </div>
            <div className="userReadTableHeader">
                <div>ISBN:</div>
                <div>Title:</div>
                <div>Author:</div>
                <div>Genre:</div>
            </div>
            {books.map((book, index) => (
                <UserReadBooksRow key={index} {...book}/>
            ))}
        </div>
    );
};

export default UserReadBooksTable;