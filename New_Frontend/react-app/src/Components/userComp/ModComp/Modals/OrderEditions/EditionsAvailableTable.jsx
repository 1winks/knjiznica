import React, {useState} from 'react';
import EditionsAvailableRow from "./EditionsAvailableRow";


const EditionsAvailableTable = ({ editions, editionsToAdd, setEditionsToAdd,
                                    authorSort, sortByAuthor, titleSort, sortByTitle}) => {
    const [numSelected, setNumSelected] = useState(0);
    const handleButtonClick = () => {
        console.log(editionsToAdd);
    };

    return (
        <div className="editionsAvailableTable">
            <div>
                <div className="bookSorters">
                    <button className="sortButton" onClick={sortByAuthor}>
                        Sort By Author {authorSort ? "▲" : "▼"}
                    </button>
                    <button className="sortButton" onClick={sortByTitle}>
                        Sort By Title {titleSort ? "▲" : "▼"}
                    </button>
                </div>
                <button className={`adder ${numSelected <= 0 ? 'disabled' : ''}`}
                        onClick={handleButtonClick} disabled={numSelected<=0}>
                    Create Order
                </button>
            </div>
            <div className="editionsAvailableTableHeader">
                <div>Selected:</div>
                <div>ISBN:</div>
                <div>Title:</div>
                <div>Author:</div>
            </div>
            {editions.map(edition => (
                <EditionsAvailableRow key={edition.editionId} {...edition}
                                      setNumSelected={setNumSelected}
                                      setEditionsToAdd={setEditionsToAdd}
                />
            ))}
        </div>
    );
};

export default EditionsAvailableTable;