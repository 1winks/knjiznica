import React from 'react';
import {Link} from "react-router-dom";
import Footer from "./Footer";

const Welcome = () => {
    const handleScrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <div className="welcome-page">
            <header className="welcome-header">
                <ul>
                    <li>
                        <button className="header-link" onClick={() => handleScrollToSection('app-info')}>App</button>
                    </li>
                    <li>
                        <button className="header-link" onClick={() => handleScrollToSection('faq')}>FAQ</button>
                    </li>
                    <li><Link className="header-link" to="/login">Login</Link></li>
                    <li><Link className="header-link" to="/register">Register</Link></li>
                </ul>
            </header>
            <main className="welcome-main">
                <section className="text-section">
                    <div>
                        <h1>Welcome to our library app!</h1>
                        <p>
                            Access our wide selection of books from all genres – <br/>
                            from the latest bestsellers to classic works.
                        </p>
                        <p> Whether you're into fiction, history, science fiction, <br/>
                            or educational books, we have something for everyone.
                        </p>
                    </div>
                </section>

                <section id="faq" className="faq-section">
                    <div>
                        <h2>FAQs (Frequently Asked Questions)</h2>
                        <div>
                            <h3>1. How do book recommendations work?</h3>
                            <p>Our recommendation system uses machine learning to suggest books
                                <br/>based on your previous orders and preferences.</p>
                        </div>
                        <div>
                            <h3>2. Can I track my order status?</h3>
                            <p>Yes! In the "My Orders" section, you can see all your active
                                <br/>and previous orders, along with delivery details.</p>
                        </div>
                        <div>
                            <h3>3. Is it possible to order online?</h3>
                            <p>Sadly, no. You need to visit us at our nearest local library!</p>
                        </div>
                    </div>
                </section>

                <section id="app-info" className="app-info-section">
                    <h2>About the App (What We Offer)</h2>
                    <ul>
                        <li>🔍 <strong>Explore the Library:</strong> Our platform allows for easy book searches by genre,
                            author, or title.
                        </li>
                        <li>📖 <strong>Your Collection:</strong> All borrowed titles are stored in your
                            user account for quick access.
                        </li>
                        <li>🕒 <strong>Track Orders:</strong> Transparent overview of your borrowed books,
                            including date and return status.
                        </li>
                        <li>➕ <strong>Personalized Recommendations:</strong> Our smart algorithm suggests books based on
                            your reading preferences.
                        </li>
                    </ul>
                    <p><strong>Join us and discover a world of books at your fingertips!</strong></p>
                </section>

            </main>
            <Footer/>
        </div>
    );
};

export default Welcome;
