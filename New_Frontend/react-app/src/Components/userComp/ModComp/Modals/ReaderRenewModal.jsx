import React, {useState} from 'react';
import {getJwt} from "../../../../Utils/userData";

const ReaderRenewModal = ({ closeModal, selectedReaderId, setAdded }) => {
    const today = new Date().toISOString().split("T")[0];
    const sixMonthToday = new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000)
        .toISOString().split("T")[0];

    const [error, setError] = useState(null);
    const [formError, setFormError] = useState("");
    const [date, setDate] = useState(sixMonthToday);


    const onUpdate = async (readerId) => {
        if (!date) {
            setFormError("Must input a date!");
            return;
        }
        const requestBody = {
            membershipFeeExpiry: date
        }
        console.log(requestBody);
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
                throw new Error('Failed to post data');
            }
            setAdded(prevState => !prevState);
        } catch (err) {
            setError(error.message);
        } finally {
            closeModal();
        }
    }

    if (error) return <p>Error: {error}</p>;
    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Update Membership</h2>
                {formError && <div style={{color: "red"}}>{formError}</div>}
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
        </div>
    );
};

export default ReaderRenewModal;