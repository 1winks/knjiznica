import React from 'react';

const PopupError = ({ errorText, closeErrorModal }) => {
    return (
        <div className="modal">
            <div className="modal-content readerRenewModal">
                <div>
                    <h2>{errorText}</h2>
                </div>
                <div className="modal-buttons error-modal-buttons">
                    <button onClick={closeErrorModal}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default PopupError;