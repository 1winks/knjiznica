import React from 'react';

const BookElement = ({title, author, genre, popularity, popular}) => {
    return (
        <div className="bookElement">
            <div>
                <div>{title}</div>
                <div>by {author}</div>
            </div>
            <div>
                <div>Genre: {genre}</div>
                <div>{popular ? "Popularity" : "Times borrowed"}: {popularity}</div>
            </div>
        </div>
    );
};

export default BookElement;