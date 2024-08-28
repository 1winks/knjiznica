import React, {useEffect, useState} from "react";
import axios from "axios";
import authHeader from "../../../services/auth-header";
import BookList from "./BookList";

const BOOK_URL = "http://localhost:8080/api/resources/books";

const ViewBooks = () => {
    const [books, setBooks] = useState([]);
    const [deleted, setDeleted] = useState(false);

    useEffect(() => {
        fetchBooks();
    }, [deleted]);

    const fetchBooks = () => {
        axios
            .get(`${BOOK_URL}`, { headers: authHeader() })
            .then((response) => {
                setBooks(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching books!", error);
            });
    };

    const handleUpdate = (bookId) => {

    };

    const handleDelete = (bookId) => {
        axios
            .delete(`${BOOK_URL}/delete/${bookId}`, { headers: authHeader() })
            .then((response) => {
                setDeleted(!deleted);
            })
            .catch((error) => {
                console.error("There was an error deleting the book!", error);
            });
    };

    return (
        <>
            <BookList books={books} onUpdate={handleUpdate} onDelete={handleDelete} />
        </>
    );
};

export default ViewBooks;