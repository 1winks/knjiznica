import React from 'react';
import './styles/Home.css';

const Home = () => {
  return (
      <div className="home-container">
        <header className="home-header">
          <h1>Welcome to Our Library System</h1>
          <p>Your one-stop solution for managing and accessing a vast collection of books.</p>
        </header>
        <section className="home-content">
          <div className="feature">
            <h2>Browse Books</h2>
            <p>Explore our extensive collection of books by various authors, genres, and topics.</p>
          </div>
          <div className="feature">
            <h2>Manage Borrowing</h2>
            <p>Easily manage your borrowed books, track due dates, and renew your loans.</p>
          </div>
          <div className="feature">
            <h2>Get Recommendations</h2>
            <p>Receive personalized book recommendations based on your reading history and preferences.</p>
          </div>
        </section>
        <footer className="home-footer">
          <p>&copy; 2024 Library System. All rights reserved.</p>
        </footer>
      </div>
  );
};

export default Home;
