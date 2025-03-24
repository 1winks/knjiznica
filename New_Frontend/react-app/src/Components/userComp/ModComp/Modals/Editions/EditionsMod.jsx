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
    const [availabilitySort, setAvailabilitySort] = useState(false);
    const [added, setAdded] = useState(false);

    const [selectedEditionId, setSelectedEditionId] = useState(0);
    const [formError, setFormError] = useState("");
    const [inputISBNValue, setInputISBNValue] = useState("");
    const [yesNo, setYesNo] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

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
        setStartDate("");
        setEndDate("");
        setYesNo("");
    }

    const onAdd = async () => {
        if (inputISBNValue.trim() === "") {
            setFormError("Input cannot be empty!");
            return;
        } else {
            setFormError("");
        }
        try {
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
    const onUpdate = async (editionId) => {
        const requestBody = {
            id: editionId,
            bookId: selectedBookId,
            isbn: findEditionById().isbn,
            available: yesNo === "yes",
            borrowDate: startDate,
            returnDate: endDate
        };
        if (setYesNo==="" || startDate==="" || endDate==="") {
            setFormError("Input cannot be empty!");
            return;
        } else {
            setFormError("");
        }
        try {
            const response = await fetch(
                `http://localhost:8080/api/resources/editions/update/${editionId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${getJwt()}`
                    },
                    body: JSON.stringify(requestBody)
                });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update edition');
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


    const onDelete = async (editionId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/resources/editions/delete/${editionId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getJwt()}`,
                }
            });
            if (!response.ok) {
                let errorMessage = 'Failed to delete edition';
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorMessage;
                } else {
                    errorMessage = await response.text();
                }
                console.log(errorMessage);
                throw new Error(errorMessage);
            }
            setAdded(prevAdded => !prevAdded);
        } catch (error) {
            setError(error.message);
            console.error('Error deleting edition:', error);
        } finally {
            closeEditionModal();
        }
    }

    const findEditionById = () => {
        return data.find((r) => r.id === selectedEditionId);
    }

    const sortByAvailability = () => {
        setFilteredUsers(prevUsers =>
            prevUsers.toSorted((a,b) => availabilitySort ?
                Number(b.available) - Number(a.available) :  Number(a.available) - Number(b.available)));
        setAvailabilitySort(prev => !prev);
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
                                    sortByAvailability={sortByAvailability}
                                    availabilitySort={availabilitySort}
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
                        onUpdate={onUpdate}
                        formError={formError}
                        findEditionById={findEditionById}
                        selectedEditionId={selectedEditionId}
                        yesNo={yesNo} setYesNo={setYesNo}
                        startDate={startDate} setStartDate={setStartDate}
                        endDate={endDate} setEndDate={setEndDate}
                />}
                {deleteModal && <DeleteEditionMod
                        closeEditionModal={closeEditionModal}
                        selectedEditionId={selectedEditionId}
                        onDelete={onDelete}
                />}
            </div>
        </div>
    );
};

export default EditionsMod;