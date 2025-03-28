import React, {useState} from 'react';
import EditionsOrderRow from "./OrderEditions/EditionsOrderRow";
import {getJwt} from "../../../../Utils/userData";

const AddOrderCreateMod = ({ editions, setCreatorModal, setError, setAdded,
                               setNumSelected, setEditionsToAdd, closeParentModal}) => {
    const today = new Date().toISOString().split("T")[0];
    const monthToday = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
    const [formError, setFormError] = useState("");
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(monthToday);
    const [username, setUsername] = useState("");

    const closeModal = () => {
        setCreatorModal(false);
        setNumSelected(0);
        setEditionsToAdd([]);
        closeParentModal();
    }

    const onAdd = async () => {
        if (endDate === "" || startDate === "" || username === "") {
            setFormError("Input can't be empty!");
            return;
        }
        if (startDate >= endDate) {
            setFormError("End date must be a date after the start date!");
            return;
        }
        setFormError("");
        const requestBody = {
            "username": username,
            "startDate": startDate,
            "endDate": endDate,
            "returnedDate": null,
            "izdanjaId": editions.map(edition => edition.editionId)
        }
        try {
            const response = await fetch(`http://localhost:8080/api/resources/orders/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getJwt()}`,
                },
                body: JSON.stringify(requestBody)
            });
            if (!response.ok) {
                let errorMessage = 'Failed to create order';
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
            console.error('Error creating order:', error);
        } finally {
            closeModal();
        }
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Create Order</h2>
                {formError && <div style={{color: "red"}}>{formError}</div>}
                <div className="addLabels">
                    <label>Username:</label>
                    <input type="text" value={username}
                           placeholder={"Enter username"}
                           onChange={(e) => setUsername(e.target.value)}
                    />
                    <label>Start Date:</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <label>End Date:</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <div>
                    <label>Books:</label>
                    {editions.map(edition => (
                        <EditionsOrderRow key={edition.editionId} {...edition}
                        />
                    ))}
                </div>
                <div className="modal-buttons">
                    <button onClick={onAdd}>Create</button>
                    <button onClick={closeModal}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default AddOrderCreateMod;