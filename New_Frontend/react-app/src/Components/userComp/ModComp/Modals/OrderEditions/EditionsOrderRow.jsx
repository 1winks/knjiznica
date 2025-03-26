import React from 'react';

const EditionsOrderRow = ({ isbn, bookName, bookAuthor}) => {
    return (
        <div className="editionsOrderRow">
            <div>{isbn}</div>
            <div>{bookName}</div>
            <div>{bookAuthor}</div>
        </div>
    );
};

export default EditionsOrderRow;