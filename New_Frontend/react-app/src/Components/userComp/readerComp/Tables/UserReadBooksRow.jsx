import React from 'react';

const UserReadBooksRow = ({ isbn, title, author, genre }) => {
    return (
        <div className="userReadBookRow">
            <div>{isbn}</div>
            <div>{title}</div>
            <div>{author}</div>
            <div>{genre}</div>
        </div>
    );
};

export default UserReadBooksRow;