import React from 'react';
import {getUsernameFromJwt} from "../../../Utils/userData";

const UserHomeComp = ({ handleView }) => {
    const username = getUsernameFromJwt();
    return (
        <div className="userHomeComp">
            <div className="userHomeHeader">
                <h1>Welcome to Your Personal Library "{username}"</h1>
                <p>Explore a vast collection of books, track your reading history, and get personalized recommendations.</p>
            </div>
            <div className="userHomeBody">
                <div className="link-section">
                    <h2>📚 Books</h2>
                    <div>
                        <p>Browse our extensive library of books.</p>
                        <p>Find your next great read among thousands of titles available.</p>
                    </div>
                    <button className="home-button" onClick={() => handleView("book")}>Explore Library</button>
                </div>
                <div className="link-section">
                    <h2>📖 My Books</h2>
                    <div>
                        <p>View the books you've read.</p>
                        <p>Keep track of your reading journey and rediscover your favorites.</p>
                    </div>
                    <button className="home-button" onClick={() => handleView("mybooks")}>View My Books</button>
                </div>
                <div className="link-section">
                    <h2>📝 My Orders</h2>
                    <div>
                        <p>Check your order history, including books you've borrowed.</p>
                        <p>View details about each order.</p>
                    </div>
                    <button className="home-button" onClick={() => handleView("order")}>View My Orders</button>
                </div>
                <div className="link-section">
                    <h2>🎯 Recommendations</h2>
                    <div>
                        <p>Discover books tailored just for you!</p>
                        <p>Our system suggests books based on your reading preferences.</p>
                    </div>
                    <button className="home-button" onClick={() => handleView("recommend")}>Get Recommendations</button>
                </div>
            </div>
        </div>
    );
};

export default UserHomeComp;