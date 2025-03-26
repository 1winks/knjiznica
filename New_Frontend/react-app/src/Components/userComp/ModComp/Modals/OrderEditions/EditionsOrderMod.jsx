import React, {useEffect, useState} from 'react';
import {getJwt} from "../../../../../Utils/userData";
import EditionsOrderTable from "./EditionsOrderTable";

const EditionsOrderMod = ({ closeModal, selectedOrderId, findOrderById}) => {
    const ids = findOrderById(selectedOrderId).izdanjaId;

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [authorSort, setAuthorSort] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await
                    fetch(`http://localhost:8080/api/resources/editions/editionsByIds`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${getJwt()}`
                        },
                        body: JSON.stringify(Array.from(ids))
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
    }, [ids]);

    useEffect(() => {
        const filtered = data.filter((book) =>
            book.bookName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.bookAuthor.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [searchTerm, data]);

    const sortByAuthor = () => {
        setFilteredUsers(prevUsers =>
            prevUsers.toSorted((a,b) => authorSort ?
                a.bookAuthor.localeCompare(b.bookAuthor) : b.bookAuthor.localeCompare(a.bookAuthor)));
        setAuthorSort(prev => !prev);
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div className="modal">
            <div className="modal-content editionsModal">
                <div className="editionsHeader">
                    <h2>Editions for order:</h2>
                    <input
                        type="text"
                        placeholder="Search by title or author"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="editionsBody">
                    <EditionsOrderTable editions={filteredUsers}
                                        authorSort={authorSort} sortByAuthor={sortByAuthor}
                    />
                </div>
                <div className="editionsButtons">
                    <button onClick={closeModal}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default EditionsOrderMod;