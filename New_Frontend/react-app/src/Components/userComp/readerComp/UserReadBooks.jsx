import React, {useEffect, useState} from 'react';
import {getJwt, getUsernameFromJwt} from "../../../Utils/userData";
import UserReadBooksTable from "./Tables/UserReadBooksTable";

const apiUrl = process.env.REACT_APP_API_URL;

const UserReadBooks = () => {
    const username = getUsernameFromJwt();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [titleSort, setTitleSort] = useState(true);
    const [authorSort, setAuthorSort] = useState(true);
    const [genreSort, setGenreSort] = useState(true);
    const [isbnSort, setIsbnSort] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/resources/books/bookuser`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${getJwt()}`
                    },
                    body: JSON.stringify({
                        username: username
                    })
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
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.isbn.toString().includes(searchTerm.toLowerCase())
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

    const sortByISBN = () => {
        setFilteredUsers(prevUsers =>
            prevUsers.toSorted((a,b) => isbnSort ?
                a.isbn-b.isbn : b.isbn-a.isbn));
        setIsbnSort(prev => !prev);
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div className="modBooks">
            <div className="adminViewHeader">
                <h2>My books:</h2>
                <input
                    type="text"
                    placeholder="Search by isbn/title/author/genre"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <UserReadBooksTable books={filteredUsers}
                                authorSort={authorSort} titleSort={titleSort}
                                genreSort={genreSort} isbnSort={isbnSort}
                                alphaSorter={alphaSorter} sortByISBN={sortByISBN}
            />
        </div>
    );
};

export default UserReadBooks;