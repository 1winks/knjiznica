import React from 'react';

const PopupError = ({ errorText, closeErrorModal }) => {
    const [firstLine, ...restLines] = errorText.split('\n');

    return (
        <div className="modal">
            <div className="modal-content readerRenewModal errorModal">
                <div>
                    <h2>{firstLine}</h2>
                </div>
                <div>
                    {restLines.length > 0 && (
                        <p>
                            {restLines.map((line, index) => (
                                <span key={index}>
                                    {line}
                                    <br />
                                </span>
                            ))}
                        </p>
                    )}
                </div>
                <div className="modal-buttons error-modal-buttons">
                    <button onClick={closeErrorModal}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default PopupError;