import React from 'react';

const ReaderUpdateModal = ({ closeModal, selectedReaderId, findReaderById, onUpdate, formError,
                           inputAddressValue, setInputAddressValue, inputPhoneValue, setInputPhoneValue}) => {

    const username = findReaderById(selectedReaderId).username;

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Update {username}'s profile:</h2>
                {formError && <div style={{color: "red"}}>{formError}</div>}
                <div className="labels">
                    <label>Address:</label>
                    <input type="text" value={inputAddressValue}
                           placeholder={findReaderById()?.address || "Enter address"}
                           onChange={(e) =>
                               setInputAddressValue(e.target.value)} required/>
                </div>
                <div className="labels">
                    <label>Phone Number:</label>
                    <input type="text" value={inputPhoneValue}
                           placeholder={findReaderById()?.phoneNumber || "Enter phone number"}
                           onChange={(e) =>
                               setInputPhoneValue(e.target.value)} required/>
                </div>
                <div className="modal-buttons">
                    <button onClick={() => onUpdate(selectedReaderId)}>Save</button>
                    <button onClick={closeModal}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default ReaderUpdateModal;