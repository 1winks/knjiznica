import React, {useState} from 'react';
import EditionsAvailableRow from "./EditionsAvailableRow";
import AddOrderCreateMod from "../AddOrderCreateMod";


const EditionsAvailableTable = ({ editions, editionsToAdd, setEditionsToAdd,
                                    authorSort, sortByAuthor, titleSort, sortByTitle,
                                    setError, setAdded, closeParentModal }) => {
    const [numSelected, setNumSelected] = useState(0);
    const [creatorModal, setCreatorModal] = useState(false);

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
                        onClick={() => setCreatorModal(true)}
                        disabled={numSelected<=0}>
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
                                      editionsToAdd={editionsToAdd}
                />
            ))}
            {creatorModal && <AddOrderCreateMod setCreatorModal={setCreatorModal}
                                                editions={editionsToAdd}
                                                setError={setError}
                                                setAdded={setAdded}
                                                setNumSelected={setNumSelected}
                                                setEditionsToAdd={setEditionsToAdd}
                                                closeParentModal={closeParentModal}
            />}
        </div>
    );
};

export default EditionsAvailableTable;