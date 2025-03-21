import React, {useEffect, useState} from 'react';
import {getJwt} from "../../../../../Utils/userData";
import EditionsTable from "./EditionsTable";
import AddEditionMod from "./AddEditionMod";
import UpdateEditionMod from "./UpdateEditionMod";
import DeleteEditionMod from "./DeleteEditionMod";

const EditionsMod = ({ closeModal, findBookById, selectedBookId }) => {
    const book = findBookById();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [added, setAdded] = useState(false);

    const [selectedEditionId, setSelectedEditionId] = useState(0);
    const [formError, setFormError] = useState("");
    const [inputISBNValue, setInputISBNValue] = useState("");

    const [addModal, setAddModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await
                    fetch(`http://localhost:8080/api/resources/bookEditions/editions/${selectedBookId}`, {
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
        const filtered = data.filter((book) =>
            book.isbn.toString().includes(searchTerm)
        );
        setFilteredUsers(filtered);
    }, [searchTerm, data]);

    const closeEditionModal = () => {
        setSelectedEditionId(0);
        setAddModal(false);
        setUpdateModal(false);
        setDeleteModal(false);
        setInputISBNValue('');
    }

    const onAdd = async () => {
        if (inputISBNValue.trim() === "") {
            setFormError("Input cannot be empty!");
            return;
        } else {
            setFormError("");
        }
        try {
            const token = getJwt();
            console.log("JWT Token:", token);
            const response = await fetch(
                `http://localhost:8080/api/resources/editions/add`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${getJwt()}`
                    },
                    body: JSON.stringify({
                        bookId: selectedBookId,
                        isbn: inputISBNValue,
                        available: true,
                        borrowDate: null,
                        returnDate: null
                    })
                });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add edition');
            }
            const result = await response.json();
            console.log("Success:", result);
            setAdded(prevAdded => !prevAdded);
        } catch (err) {
            console.error("Error:", err);
            setError(err.message || "Unknown error occurred");
        } finally {
            closeEditionModal();
        }
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div className="modal">
            <div className="modal-content editionsModal">
                <div className="editionsHeader">
                    <h2>Editions for book {book.title}:</h2>
                    <input
                        type="text"
                        placeholder="Search by isbn"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="editionsBody">
                    {<EditionsTable editions={filteredUsers}
                                    setSelectedEditionId={setSelectedEditionId}
                                    setAddModal={setAddModal}
                                    setUpdateModal={setUpdateModal}
                                    setDeleteModal={setDeleteModal}
                    />}
                </div>
                <div className="editionsButtons">
                    <button onClick={closeModal}>Close</button>
                </div>
                {addModal && <AddEditionMod
                        closeEditionModal={closeEditionModal}
                        onAdd={onAdd}
                        formError={formError}
                        inputISBNValue={inputISBNValue}
                        setInputISBNValue={setInputISBNValue}
                />}
                {updateModal && <UpdateEditionMod
                        closeEditionModal={closeEditionModal}
                />}
                {deleteModal && <DeleteEditionMod
                        closeEditionModal={closeEditionModal}
                />}
            </div>
        </div>
    );
};

export default EditionsMod;