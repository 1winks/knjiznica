import React, {useEffect, useState} from 'react';
import {getJwt} from "../../../../Utils/userData";
import EditionsAvailableTable from "./OrderEditions/EditionsAvailableTable";

const AddOrderMod = ({ closeModal, onAdd }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [titleSort, setTitleSort] = useState(false);
    const [authorSort, setAuthorSort] = useState(false);

    const [editionsToAdd, setEditionsToAdd] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await
                    fetch(`http://localhost:8080/api/resources/editions/available`, {
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
        const normalizedSearch = searchTerm.trim().toLowerCase();
        const filtered = data.filter((edition) => {
            return (
                edition.bookName.toLowerCase().includes(normalizedSearch) ||
                edition.bookAuthor.toLowerCase().includes(normalizedSearch) ||
                edition.isbn.toString().includes(normalizedSearch)
            );
        });
        setFilteredUsers(filtered);
    }, [searchTerm, data]);

    const sortByAuthor = () => {
        setFilteredUsers(prevUsers =>
            prevUsers.toSorted((a,b) => authorSort ?
                a.bookAuthor.localeCompare(b.bookAuthor) : b.bookAuthor.localeCompare(a.bookAuthor)));
        setAuthorSort(prev => !prev);
    }

    const sortByTitle = () => {
        setFilteredUsers(prevUsers =>
            prevUsers.toSorted((a,b) => titleSort ?
                a.bookName.localeCompare(b.bookName) : b.bookName.localeCompare(a.bookName)));
        setTitleSort(prev => !prev);
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div className="modal">
            <div className="modal-content editionsModal">
                <div className="editionsHeader">
                    <h2>Available editions:</h2>
                    <input
                        type="text"
                        placeholder="Search by title/author/isbn"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="editionsBody">
                    <EditionsAvailableTable editions={filteredUsers}
                                            authorSort={authorSort} sortByAuthor={sortByAuthor}
                                            titleSort={titleSort} sortByTitle={sortByTitle}
                                            editionsToAdd={editionsToAdd} setEditionsToAdd={setEditionsToAdd}
                    />
                </div>
                <div className="editionsButtons">
                    <button onClick={closeModal}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default AddOrderMod;