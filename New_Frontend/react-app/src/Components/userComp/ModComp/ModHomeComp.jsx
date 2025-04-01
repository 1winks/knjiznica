import React from 'react';
import {getUsernameFromJwt} from "../../../Utils/userData";

const ModHomeComp = ({ handleView }) => {
    const username = getUsernameFromJwt();
    return (
        <div className="userHomeComp">
            <div className="userHomeHeader">
                <h1>Welcome to your Moderator Account "{username}"</h1>
                <p>Manage a vast collection of books, track our users' order history, and manage their memberships.</p>
            </div>
            <div className="userHomeBody">
                <div className="link-section">
                    <h2>📚 Books</h2>
                    <div>
                        <p>Manage our extensive book collection.</p>
                        <p>Add, update or delete books and edition present within the library.</p>
                    </div>
                    <button className="home-button" onClick={() => handleView("book")}>View Books</button>
                </div>
                <div className="link-section">
                    <h2>🕒 Orders</h2>
                    <div>
                        <p>Manage our readers' orders.</p>
                        <p>Keep track of their history and help them on their reading journey.</p>
                    </div>
                    <button className="home-button" onClick={() => handleView("order")}>View Orders</button>
                </div>
                <div className="link-section">
                    <h2>🧑‍🏫 Readers</h2>
                    <div>
                        <p>Check our reader details, including their contact-info and membership.</p>
                        <p>View details about each reader.</p>
                    </div>
                    <button className="home-button" onClick={() => handleView("reader")}>View Readers</button>
                </div>
            </div>
        </div>
    );
};

export default ModHomeComp;