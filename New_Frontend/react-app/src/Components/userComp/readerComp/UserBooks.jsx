import React, {useEffect, useState} from 'react';
import {getJwt, getUsernameFromJwt} from "../../../Utils/userData";
import UserBooksTable from "./Tables/UserBooksTable";
import BookEditionModal from "./Modals/BookEditionModal";

const UserBooks = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [titleSort, setTitleSort] = useState(true);
    const [authorSort, setAuthorSort] = useState(true);
    const [genreSort, setGenreSort] = useState(true);
    const [availabilitySort, setAvailabilitySort] = useState(true);

    const [selectedBookTitle, SetSelectedBookTitle] = useState("");
    const [editionsMod, setEditionsMod] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/resources/books/bookeds', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${getJwt()}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const filtered = data.filter((book) =>
            book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.genre.toLowerCase().includes(searchTerm.toLowerCase())  ||
            book.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [searchTerm, data]);

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

    const sortByAvailability = () => {
        setFilteredUsers(prevUsers =>
            prevUsers.toSorted((a,b) => availabilitySort ?
                Number(b.available) - Number(a.available) :  Number(a.available) - Number(b.available)));
        setAvailabilitySort(prev => !prev);
    }

    const findBookByTitle = () => {
        return data.find((r) => r.title === selectedBookTitle);
    }

    const closeModal = () => {
        SetSelectedBookTitle("");
        setEditionsMod(false);
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div className="modBooks">
            <div className="adminViewHeader">
                <h2>Available books:</h2>
                <input
                    type="text"
                    placeholder="Search by title or author"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <UserBooksTable books={filteredUsers}
                                authorSort={authorSort} titleSort={titleSort}
                                genreSort={genreSort} alphaSorter={alphaSorter}
                                availableSort={availabilitySort} sortAvailable={sortByAvailability}
                                setEditionsMod={setEditionsMod} SetSelectedBookTitle={SetSelectedBookTitle}
            />
            {editionsMod && <BookEditionModal
                                closeModal={closeModal} findBookByTitle={findBookByTitle}
            />}
        </div>
    );
};

export default UserBooks;