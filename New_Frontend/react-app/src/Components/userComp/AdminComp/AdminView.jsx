import React, {useEffect, useState} from 'react';
import {getJwt} from "../../../Utils/userData";
import UserTable from "./UserTable";
import PopupError from "../PopupError";

const AdminView = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [ roleSort, setRoleSort ] = useState(false);
    const [ nameSort, setNameSort ] = useState(true);
    const [added, setAdded] = useState(false);

    const [modal, setModal] = useState(false);
    const [selectedUserId, SetSelectedUserId] = useState(0);

    const [errorModal, setErrorModal] = useState(false);
    const [formError, setFormError] = useState("");

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
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [added]);

    useEffect(() => {
        const filtered = data.filter((user) =>
            user.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [searchTerm, data]);

    const onDelete = async (id) => {
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
            console.log("Success deleting!")
            setAdded(prevAdded => !prevAdded);
            closeModal();
        } catch (error) {
            setFormError(error.message || "Unknown error occurred");
            setErrorModal(true);
            console.error("Error:", error);
        }
    }

    const sortRoles = () => {
        const roleOrder = roleSort ?
            {"ROLE_MODERATOR":1, "ROLE_USER":2} : {"ROLE_MODERATOR":2, "ROLE_USER":1}
        setFilteredUsers(prevUsers =>
            prevUsers.toSorted((a, b) => roleOrder[a.role] - roleOrder[b.role]));
        setRoleSort(prev => !prev);
    }

    const sortNames = () => {
        setFilteredUsers(prevUsers =>
            prevUsers.toSorted((a,b) => nameSort ?
                a.username.localeCompare(b.username) : b.username.localeCompare(a.username)));
        setNameSort(prev => !prev);
    }

    const closeModal = () => {
        SetSelectedUserId(0);
        setModal(false);
    }

    const closeErrorModal = () => {
        setFormError("");
        setErrorModal(false);
    }

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
            <UserTable users={filteredUsers} onDelete={() => setModal(true)}
                       sortRoles={sortRoles} sortNames={sortNames}
                       nameSort={nameSort} roleSort={roleSort}
                       SetSelectedUserId={SetSelectedUserId}/>
            {modal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Are you sure you want to delete this user?</h2>
                        <div className="modal-buttons">
                            <button className="delete-btn2"
                                    onClick={() => onDelete(selectedUserId)}>
                                Delete
                            </button>
                            <button onClick={closeModal}>Close</button>
                        </div>
                    </div>
                </div>
            )}
            {errorModal && <PopupError errorText={formError} closeErrorModal={closeErrorModal}/>}
        </div>
    );
};

export default AdminView;