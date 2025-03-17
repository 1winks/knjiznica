import React, {useEffect, useState} from 'react';
import {getJwt} from "../../../Utils/userData";
import UserTable from "./UserTable";

const AdminView = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/auth/userroles', {
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

    const onDelete = async (id) => {
        console.log(id)
        try {
            const response = await fetch(`http://localhost:8080/api/auth/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getJwt()}`,
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete user');
            }
            setData(data.filter(user => user.id !== id));
            setFilteredUsers(filteredUsers.filter(user => user.id !== id));
            alert('User deleted successfully');
        } catch (error) {
            setError(error.message);
            console.error('Error deleting user:', error);
        }
    }

    useEffect(() => {
        const filtered = data.filter((user) =>
            user.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [searchTerm, data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div className="adminView">
            <div className="adminViewHeader">
                <h2>User management:</h2>
                <input
                    type="text"
                    placeholder="Search by username"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <UserTable users={filteredUsers} onDelete={onDelete}/>
        </div>
    );
};

export default AdminView;