import React, {useEffect, useState} from 'react';
import UserEditionsTable from "../Tables/UserEditionsTable";

const BookEditionModal = ({ findBookByTitle, closeModal}) => {
    const book = findBookByTitle();
    const [data, setData] = useState(book.editionISBNS);
    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [availabilitySort, setAvailabilitySort] = useState(true);
    const [isbnSort, setIsbnSort] = useState(true);

    useEffect(() => {
        const filtered = data.filter((book) =>
            book.isbn.toString().includes(searchTerm) ||
            (!(book.available) && book.returnDate.includes(searchTerm))
        );
        setFilteredUsers(filtered);
    }, [searchTerm, data]);

    const sortByAvailability = () => {
        setFilteredUsers(prevUsers =>
            prevUsers.toSorted((a,b) => availabilitySort ?
                Number(b.available) - Number(a.available) :  Number(a.available) - Number(b.available)));
        setAvailabilitySort(prev => !prev);
    }

    const sortByISBN = () => {
        setFilteredUsers(prevUsers =>
            prevUsers.toSorted((a,b) => isbnSort ?
                a.isbn-b.isbn : b.isbn-a.isbn));
        setIsbnSort(prev => !prev);
    }

    if (error) return <p>Error: {error}</p>;
    return (
        <div className="modal">
            <div className="modal-content editionsModal">
                <div className="editionsHeader">
                    <h2>Editions for book "{book.title}":</h2>
                    <input
                        type="text"
                        placeholder="Search by isbn or return date"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="editionsBody">
                    <UserEditionsTable
                            editions={filteredUsers}
                            availabilitySort={availabilitySort} isbnSort={isbnSort}
                            sortIsbn={sortByISBN} sortAvailable={sortByAvailability}
                    />
                </div>
                <div className="editionsButtons">
                    <button onClick={closeModal}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default BookEditionModal;