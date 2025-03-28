import React, {useState} from 'react';

const EditionsAvailableRow = ({ editionId, isbn, bookName, bookAuthor,
                                  setNumSelected, setEditionsToAdd, editionsToAdd }) => {
    const isChecked = editionsToAdd.some(edition => edition.editionId === editionId);
    const editionBody = {
        editionId: editionId,
        isbn: isbn,
        bookName: bookName,
        bookAuthor: bookAuthor
    }
    const handleCheckboxChange = (event) => {
        const isChecked = event.target.checked;
        setNumSelected(prevCount => isChecked ? prevCount + 1 : prevCount - 1);
        setEditionsToAdd(prevEditions => {
            if (isChecked) {
                return [...prevEditions, editionBody];
            } else {
                return prevEditions.filter(edition => edition.editionId !== editionBody.editionId);
            }
        });
    };

    return (
        <div className="editionsAvailableRow">
            <div>
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
            </div>
            <div>{isbn}</div>
            <div>{bookName}</div>
            <div>{bookAuthor}</div>
        </div>
    );
};

export default EditionsAvailableRow;