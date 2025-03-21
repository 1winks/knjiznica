import React from 'react';
import EditionsRow from "./EditionsRow";

const EditionsTable = ({ editions, setSelectedEditionId,
                           setAddModal, setUpdateModal, setDeleteModal }) => {
    return (
        <div className="editionsTable">
            <div>
                <div className="bookSorters">
                    <button className="sortButton" onClick={() => console.log("sort")}>
                        Sort By Availability {true ? "▲" : "▼"}
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
                <div className="updateDiv">update:</div>
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