import React from 'react';
import BookRow from "./BookRow";

const BookTable = ({ books, titleSort, authorSort, genreSort, alphaSorter,
                       setAddModal, setUpdateModal, setDeleteModal, setSelectedBookId }) => {
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
                </div>
                <button className="adder" onClick={() => setAddModal(true)}>
                    Add
                </button>
            </div>
            <div className="bookTableHeader">
                <div>Title:</div>
                <div>Author:</div>
                <div>Genre:</div>
                <div className="updateDiv">update:</div>
            </div>
            {books.map(book => (
                <BookRow key={book.id} {...book} setUpdateModal={setUpdateModal}
                         setDeleteModal={setDeleteModal} setSelectedBookId={setSelectedBookId}/>
            ))}
        </div>
    );
};

export default BookTable;