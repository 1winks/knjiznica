import React, {useEffect, useState} from 'react';
import EditionsOrderRow from "./OrderEditions/EditionsOrderRow";
import {getJwt} from "../../../../Utils/userData";
import UsernameSearchInput from "./UsernameSearchInput";
import PopupError from "../../PopupError";

const apiUrl = process.env.REACT_APP_API_URL;

const AddOrderCreateMod = ({ editions, setCreatorModal, setError, setAdded,
                               setNumSelected, setEditionsToAdd, closeParentModal}) => {
    const today = new Date().toISOString().split("T")[0];
    const monthToday = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
    const [formError, setFormError] = useState("");
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(monthToday);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error2, setError2] = useState(null);
    const [username, setUsername] = useState("");

    const [errorModal, setErrorModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/resources/readers/renewed`, {
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
                const usernames = result.map(reader => reader.username);
                setData(usernames);
            } catch (error) {
                setError2(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const closeModal = () => {
        setCreatorModal(false);
        setNumSelected(0);
        setEditionsToAdd([]);
        closeParentModal();
    }

    const onAdd = async () => {
        if (endDate === "" || startDate === "") {
            setFormError("Date input can't be empty!");
            setErrorModal(true);
            return;
        }
        if (startDate >= endDate) {
            setFormError("End date must be a date after the start date!");
            setErrorModal(true);
            return;
        }
        if (username === "") {
            setFormError("Not a valid username!");
            setErrorModal(true);
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
            const response = await fetch(`${apiUrl}/api/resources/orders/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getJwt()}`,
                },
                body: JSON.stringify(requestBody)
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create order');
            }
            console.log("Success creating!");
            setAdded(prevAdded => !prevAdded);
            closeModal();
        } catch (error) {
            setFormError(error.message || "Unknown error occurred");
            setErrorModal(true);
            console.error("Error:", error);
        }
    }

    const closeErrorModal = () => {
        setErrorModal(false);
        setFormError("");
    }


    if (loading) return <p>Loading...</p>;
    if (error2) return <p>Error: {error2}</p>;
    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Create Order</h2>
                <div className="addLabels">
                    <label>Selected user: <span style={{color: "blue"}}>{username}</span></label>
                    <UsernameSearchInput usernames={data} setUsername={setUsername} />
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
            {errorModal && <PopupError
                        closeErrorModal={closeErrorModal}
                        errorText={formError}
            />}
        </div>
    );
};

export default AddOrderCreateMod;