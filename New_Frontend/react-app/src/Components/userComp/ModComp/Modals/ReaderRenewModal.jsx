import React, {useState} from 'react';
import {getJwt} from "../../../../Utils/userData";
import PopupError from "../../PopupError";

const ReaderRenewModal = ({ closeModal, selectedReaderId, setAdded, findReaderById }) => {
    const today = new Date().toISOString().split("T")[0];
    const monthToday = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString().split("T")[0];
    const sixMonthToday = new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000)
        .toISOString().split("T")[0];

    const [formError, setFormError] = useState("");
    const [date, setDate] = useState(sixMonthToday);
    const [errorModal, setErrorModal] = useState(false);

    const username = findReaderById(selectedReaderId).username;

    const onUpdate = async (readerId) => {
        if (!date) {
            setFormError("Must input a date!");
            setErrorModal(true);
            return;
        }
        if (date<monthToday) {
            setFormError("Date must be at least a month after today!");
            setErrorModal(true);
            return;
        }
        setFormError("");
        const requestBody = {
            membershipFeeExpiry: date
        }
        try {
            const response = await fetch(
                `http://localhost:8080/api/resources/readers/renew/${readerId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${getJwt()}`
                    },
                    body: JSON.stringify(requestBody)
                });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to renew membership');
            }
            console.log("Success renewing!");
            setAdded(prevState => !prevState);
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

    return (
        <div className="modal">
            <div className="modal-content readerRenewModal">
                <h2>Renew {username}'s membership until:</h2>
                <div className="addLabels">
                    <label>End Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div className="modal-buttons">
                    <button onClick={() => onUpdate(selectedReaderId)}>Save</button>
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

export default ReaderRenewModal;