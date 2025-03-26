import React, {useEffect, useState} from 'react';
import EditionsOrderRow from "./EditionsOrderRow";

const EditionsOrderTable = ({ editions, authorSort, sortByAuthor }) => {
    return (
        <div className="editionsOrderTable">
            <div>
                <div className="bookSorters">
                    <button className="sortButton" onClick={sortByAuthor}>
                        Sort By Author {authorSort ? "▲" : "▼"}
                    </button>
                </div>
            </div>
            <div className="editionsOrderTableHeader">
                <div>ISBN:</div>
                <div>Title:</div>
                <div>Author:</div>
            </div>
            {editions.map(edition => (
                <EditionsOrderRow key={edition.editionId} {...edition}/>
            ))}
        </div>
    );
};

export default EditionsOrderTable;