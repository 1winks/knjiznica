import React from "react";
import getRole from "../../RoleHelper";

const Book = ({ book, onUpdate, onDelete }) => {
    const handleDeleteClick = () => {
        onDelete(book.id);
    };

    const handleUpdateClick = () => {
        onUpdate(book.id);
    };

    return (
        <tr>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.genre}</td>
            <td>
                <button className="btn btn-danger" onClick={handleUpdateClick}>
                    *
                </button>
            </td>
            <td>
                <button className="btn btn-danger" onClick={handleDeleteClick}>
                    -
                </button>
            </td>
        </tr>
    );
};

export default Book;