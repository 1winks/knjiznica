import React from 'react';

const UpdateEditionMod = ({ closeEditionModal, onUpdate, formError, selectedEditionId, findEditionById,
                              yesNo, setYesNo, startDate, setStartDate, endDate, setEndDate }) => {
    return (
        <div className="addBookMod modal">
            <div className="modal-content">
                <h2>Update edition {findEditionById().isbn}</h2>
                {formError && <div style={{color: "red"}}>{formError}</div>}
                <div className="labels">
                    <label>Available:</label>
                    <label>
                        <input
                            type="radio"
                            name="yesNo"
                            value="yes"
                            checked={yesNo === "yes"}
                            onChange={() => setYesNo("yes")}
                        />
                        Yes
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="yesNo"
                            value="no"
                            checked={yesNo === "no"}
                            onChange={() => setYesNo("no")}
                        />
                        No
                    </label>
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
                <div className="modal-buttons">
                    <button onClick={() => onUpdate(selectedEditionId)}>Save</button>
                    <button onClick={closeEditionModal}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default UpdateEditionMod;