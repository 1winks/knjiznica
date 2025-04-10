import React, {useEffect, useState} from 'react';
import {getJwt, getUsernameFromJwt} from "../../../Utils/userData";
import BookElement from "./Tables/BookElement";

const UserRecommend = ({ handleView }) => {
    const username = getUsernameFromJwt();
    const [booksRead, setBooksRead] = useState([]);
    const [booksPopular, setBooksPopular] = useState([]);
    const [booksRecommend, setBooksRecommend] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/resources/books/numread', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${getJwt()}`,
                    },
                    body: JSON.stringify({
                        username: username,
                    }),
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result = await response.json();
                setBooksRead(result);
            } catch (error) {
                setError(error.message);
            }
        };
        const fetchPopular = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/resources/books/popular', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${getJwt()}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result = await response.json();
                setBooksPopular(result);
            } catch (error) {
                setError(error.message);
            }
        };
        const fetchRecommend = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/resources/books/recommend', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${getJwt()}`,
                    },
                    body: JSON.stringify({
                        username: username,
                    }),
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result = await response.json();
                setBooksRecommend(result);
            } catch (error) {
                setError(error.message);
            }
        };
        const loadData = async () => {
            setLoading(true);
            try {
                await Promise.all([fetchBooks(), fetchPopular()]);
                if (booksRead.length >= 10) {
                    await fetchRecommend();
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [username, booksRead.length]);

    const determineData = () => {
        if (booksRead.length >= 10 && booksRecommend.length > 0) {
            return booksRecommend.map((book, index) => (<BookElement key={index} {...book} popular={false}/>));
        }
        return booksPopular.length > 0 ?
            booksPopular.map((book, index) => (<BookElement key={index} {...book} popular={true}/>)) :
            <p>No recommendations available.</p>;
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div className="userRecommendHelper">
            <div className="userRecommendHeader">
                <h1>
                    {booksRead.length < 9 ?
                        "Read 10 or more books to get our premium recommendations!"
                        : "Our premium recommendations:"}
                </h1>
            </div>
            <div className="userRecommend">
                <div className="recommendationsContainer">
                    <div className="recommendationsContainerHeader">
                        Our top recommendations for you are:
                    </div>
                    <div className="recommendationsContainerBody">
                        {determineData()}
                    </div>
                    <div className="recommendationsContainerButton">
                        <button onClick={() => handleView("book")}>
                            Browse Books
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserRecommend;