import React from "react";
import Book from "./Book";

const BookList = ({ books, onUpdate, onDelete }) => {
    return (
        <>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Genre</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {books.map((book) => (
                    <Book
                        key={book.id}
                        book={book}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                    />
                ))}
                </tbody>
            </table>
        </>
    );
};

export default BookList;
