import React, {useState} from "react";
import axios from "axios";
import authHeader from "../../../services/auth-header";
import "./Books.css";

const BOOK_URL = "http://localhost:8080/api/resources/books/add";

const AddBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const bookData = {
            title,
            author,
            genre,
        };
        axios.post(BOOK_URL, bookData, { headers: authHeader() })
            .then((response) => {
                console.log("Book created successfully!", response.data);
                alert("Book created successfully!");
                setTitle('');
                setAuthor('');
                setGenre('');
            })
            .catch((error) => {
                console.error("There was an error creating the book!", error);
            });
    };

    return (
        <div className="book-form-inner">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="author">Author:</label>
                    <input
                        type="text"
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="genre">Genre:</label>
                    <input
                        type="text"
                        id="genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Book</button>
            </form>
        </div>
    );
};

export default AddBook;