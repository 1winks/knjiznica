import React from 'react';
import EditionsRow from "./EditionsRow";

const EditionsTable = ({ editions, setSelectedEditionId,
                           setAddModal, setUpdateModal, setDeleteModal, availabilitySort, sortByAvailability }) => {
    return (
        <div className="editionsTable">
            <div>
                <div className="bookSorters">
                    <button className="sortButton" onClick={() => sortByAvailability()}>
                        Sort By Availability {availabilitySort ? "▲" : "▼"}
                    </button>
                </div>
                <button className="adder" onClick={() => setAddModal(true)}>
                    Add
                </button>
            </div>
            <div className="editionsTableHeader">
                <div>ISBN:</div>
                <div>Available:</div>
                <div>BorrowDate:</div>
                <div>ReturnDate:</div>
                <div>Actions:</div>
            </div>
            {editions.map(edition => (
                <EditionsRow key={edition.id} {...edition}
                             setSelectedEditionId={setSelectedEditionId}
                             setUpdateModal={setUpdateModal}
                             setDeleteModal={setDeleteModal}
                />
            ))}
        </div>
    );
};

export default EditionsTable;