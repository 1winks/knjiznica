import React from 'react';

const BookElement = ({title, author, genre, popularity}) => {
    return (
        <div className="bookElement">
            <div>
                <div>{title}</div>
                <div>by {author}</div>
            </div>
            <div>
                <div>Genre: {genre}</div>
                <div>Popularity: {popularity}</div>
            </div>
        </div>
    );
};

export default BookElement;