import React, {useEffect, useState} from 'react';
import UserReadBooksTable from "../Tables/UserReadBooksTable";

const OrderEditionModal = ({ closeModal, selectedEditions, selectedStart }) => {
    const [data, setData] = useState(selectedEditions);
    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [isbnSort, setIsbnSort] = useState(true);
    const [authorSort, setAuthorSort] = useState(true);
    const [titleSort, setTitleSort] = useState(true);
    const [genreSort, setGenreSort] = useState(true);

    useEffect(() => {
        const filtered = data.filter((book) =>
            book.isbn.toString().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.genre.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [searchTerm, data]);

    const sortByISBN = () => {
        setFilteredUsers(prevUsers =>
            prevUsers.toSorted((a,b) => isbnSort ?
                a.isbn-b.isbn : b.isbn-a.isbn));
        setIsbnSort(prev => !prev);
    }

    const alphaSorter = (order, param) => {
        let sortedArray = [...filteredUsers];
        switch (param) {
            case "title":
                sortedArray = sortedArray.toSorted((a, b) =>
                    order ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
                );
                setTitleSort(prev => !prev);
                break;
            case "author":
                sortedArray = sortedArray.toSorted((a, b) =>
                    order ? a.author.localeCompare(b.author) : b.author.localeCompare(a.author)
                );
                setAuthorSort(prev => !prev);
                break;
            case "genre":
                sortedArray = sortedArray.toSorted((a, b) =>
                    order ? a.genre.localeCompare(b.genre) : b.genre.localeCompare(a.genre)
                );
                setGenreSort(prev => !prev);
                break;
            default:
                return;
        }
        setFilteredUsers(sortedArray);
    };

    return (
        <div className="modal">
            <div className="modal-content editionsModal">
                <div className="editionsHeader">
                    <h2>Books for order {selectedStart}:</h2>
                    <input
                        type="text"
                        placeholder="Search by title/author/genre/isbn"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="editionsBody">
                    <UserReadBooksTable books={filteredUsers}
                                        authorSort={authorSort} titleSort={titleSort}
                                        genreSort={genreSort} isbnSort={isbnSort}
                                        alphaSorter={alphaSorter} sortByISBN={sortByISBN}
                    />
                </div>
                <div className="editionsButtons">
                    <button onClick={closeModal}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default OrderEditionModal;