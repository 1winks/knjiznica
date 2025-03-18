import React, {useEffect, useState} from 'react';
import {getJwt} from "../../../Utils/userData";
import ReaderTable from "./ReaderTable";

const ModReaders = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [nameSort, setNameSort] = useState(true);
    const [emailSort, setEmailSort] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/resources/readers', {
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
                setFilteredUsers(result);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const filtered = data.filter((reader) =>
            reader.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reader.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [searchTerm, data]);

    const onUpdate = (readerId) => {
        console.log(readerId);
    }

    const sortNames = () => {
        setFilteredUsers(prevUsers =>
            prevUsers.toSorted((a,b) => nameSort ?
                a.username.localeCompare(b.username) : b.username.localeCompare(a.username)));
        setNameSort(prev => !prev);
    }
    const sortEmails = () => {
        setFilteredUsers(prevUsers =>
            prevUsers.toSorted((a,b) => emailSort ?
                a.email.localeCompare(b.email) : b.email.localeCompare(a.email)));
        setEmailSort(prev => !prev);
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div className="modReaders">
            <div className="adminViewHeader">
                <h2>Reader management:</h2>
                <input
                    type="text"
                    placeholder="Search by username or e-mail"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <ReaderTable readers={filteredUsers} onUpdate={onUpdate}
                         nameSort={nameSort} sortNames={sortNames}
                            sortEmails={sortEmails} emailSort={emailSort}/>
        </div>
    );
};

export default ModReaders;