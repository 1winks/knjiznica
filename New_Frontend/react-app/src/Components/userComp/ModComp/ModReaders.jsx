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

    const [modal, setModal] = useState(false);
    const [formError, setFormError] = useState("");
    const [selectedReaderId, SetSelectedReaderId] = useState(0);
    const [inputAddressValue, setInputAddressValue] = useState("");
    const [inputPhoneValue, setInputPhoneValue] = useState("");

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

    const onUpdate = async (readerId) => {
        if (inputAddressValue.trim() === "" || inputPhoneValue.trim() === "") {
            setFormError("Input cannot be empty!");
            return;
        } else {
            setFormError("");
            console.log("Form submitted with value:", );
        }
        try {
            const response = await fetch(
                `http://localhost:8080/api/resources/readers/update/${readerId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getJwt()}`
                },
                body: JSON.stringify({
                    address: inputAddressValue,
                    phoneNumber: inputPhoneValue
                })
            });
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            setData((prevData) =>
                prevData.map((reader) =>
                    reader.readerId === readerId ?
                        { ...reader, address: inputAddressValue, phoneNumber: inputPhoneValue }
                        : reader
                )
            );
        } catch (err) {
            setError(error.message);
        } finally {
            closeModal();
        }
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

    const closeModal = () => {
        SetSelectedReaderId(0);
        setInputAddressValue('');
        setInputPhoneValue('');
        setModal(false);
    }

    const findReaderById = () => {
        return data.find((r) => r.readerId === selectedReaderId);
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
            <ReaderTable readers={filteredUsers} onUpdate={() => setModal(true)}
                         nameSort={nameSort} sortNames={sortNames}
                         sortEmails={sortEmails} emailSort={emailSort}
                         SetSelectedReaderId={SetSelectedReaderId}
            />
            {modal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Update Reader</h2>
                        {formError && <div style={{ color: "red" }}>{formError}</div>}
                        <div className="labels">
                            <label>Address:</label>
                            <input type="text" value={inputAddressValue}
                                   placeholder={findReaderById()?.address || "Enter address"}
                                   onChange={(e) =>
                                       setInputAddressValue(e.target.value)} required />
                        </div>
                        <div className="labels">
                            <label>Phone Number:</label>
                            <input type="text" value={inputPhoneValue}
                                   placeholder={findReaderById()?.phoneNumber || "Enter phone number"}
                                   onChange={(e) =>
                                       setInputPhoneValue(e.target.value)} required />
                        </div>
                        <div className="modal-buttons">
                            <button onClick={() => onUpdate(selectedReaderId)}>Save</button>
                            <button onClick={closeModal}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModReaders;