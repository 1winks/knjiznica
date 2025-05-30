import React, {useEffect, useState} from 'react';
import BookTable from "./Tables/BookTable";
import {getJwt} from "../../../Utils/userData";
import AddBookMod from "./Modals/AddBookMod";
import DeleteBookMod from "./Modals/DeleteBookMod";
import UpdateBookMod from "./Modals/UpdateBookMod";
import EditionsMod from "./Modals/BookEditions/EditionsMod";
import PopupError from "../PopupError";

const apiUrl = process.env.REACT_APP_API_URL;

const ModBooks = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [titleSort, setTitleSort] = useState(true);
    const [authorSort, setAuthorSort] = useState(true);
    const [genreSort, setGenreSort] = useState(true);
    const [popularitySort, setPopularitySort] = useState(true);

    const [selectedBookId, SetSelectedBookId] = useState(0);
    const [formError, setFormError] = useState("");
    const [inputTitleValue, setInputTitleValue] = useState("");
    const [inputAuthorValue, setInputAuthorValue] = useState("");
    const [inputGenreValue, setInputGenreValue] = useState("");
    const [added, setAdded] = useState(false);

    const [addModal, setAddModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editionsModal, setEditionsModal] = useState(false);
    const [errorModal, setErrorModal] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/resources/books`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${getJwt()}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [added]);

    useEffect(() => {
        const filtered = data.filter((book) =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.genre.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [searchTerm, data]);

    const alphaSorter = (order, param) => {
        let sortedArray = [...filteredUsers];
        switch (param) {
            case "title":
                sortedArray = sortedArray.toSorted((a, b) =>
                    order ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
                );
                setTitleSort(prev => !prev);
                break;
            case "author":
                sortedArray = sortedArray.toSorted((a, b) =>
                    order ? a.author.localeCompare(b.author) : b.author.localeCompare(a.author)
                );
                setAuthorSort(prev => !prev);
                break;
            case "genre":
                sortedArray = sortedArray.toSorted((a, b) =>
                    order ? a.genre.localeCompare(b.genre) : b.genre.localeCompare(a.genre)
                );
                setGenreSort(prev => !prev);
                break;
            default:
                return;
        }
        setFilteredUsers(sortedArray);
    };

    const closeModal = () => {
        SetSelectedBookId(0);
        setInputTitleValue('');
        setInputAuthorValue('');
        setInputGenreValue('');
        setAddModal(false);
        setUpdateModal(false);
        setDeleteModal(false);
        setEditionsModal(false);
    }

    const onAdd = async () => {
        if (inputAuthorValue.trim() === "" || inputTitleValue.trim() === "" || inputGenreValue.trim() === "") {
            setFormError("Input can't be empty!");
            setErrorModal(true);
            return;
        }
        setFormError("");
        try {
            const response = await fetch(
                `${apiUrl}/api/resources/books/add`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${getJwt()}`
                    },
                    body: JSON.stringify({
                        title: inputTitleValue,
                        author: inputAuthorValue,
                        genre: inputGenreValue
                    })
                });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add book');
            }
            console.log("Success adding!");
            setAdded(prevAdded => !prevAdded);
            closeModal();
        } catch (error) {
            setFormError(error.message || "Unknown error occurred");
            setErrorModal(true);
            console.error("Error:", error);
        }
    }

    const onUpdate = async (bookId) => {
        if (inputAuthorValue.trim() === "" || inputGenreValue.trim() === "") {
            setFormError("Input can't be empty!");
            setErrorModal(true);
            return;
        }
        setFormError("");
        try {
            const response = await fetch(
                `${apiUrl}/api/resources/books/update/${bookId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${getJwt()}`
                    },
                    body: JSON.stringify({
                        title: findBookById(selectedBookId).title,
                        author: inputAuthorValue,
                        genre: inputGenreValue
                    })
                });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update book');
            }
            console.log("Success updating!");
            setAdded(prevAdded => !prevAdded);
            closeModal();
        } catch (error) {
            setFormError(error.message || "Unknown error occurred");
            setErrorModal(true);
            console.error("Error:", error);
        }
    }

    const onDelete = async (bookId) => {
        try {
            const response = await fetch(`${apiUrl}/api/resources/books/delete/${bookId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getJwt()}`,
                }
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete book');
            }
            console.log("Success deleting!");
            setAdded(prevAdded => !prevAdded);
            closeModal();
        } catch (error) {
            setFormError(error.message || "Unknown error occurred");
            setErrorModal(true);
            console.error("Error:", error);
        }
    }

    const sortByPopularity = () => {
        setFilteredUsers(prevUsers =>
            prevUsers.toSorted((a,b) => popularitySort ?
                a.popularity-b.popularity : b.popularity-a.popularity));
        setPopularitySort(prev => !prev);
    }

    const findBookById = () => {
        return data.find((r) => r.id === selectedBookId);
    }

    const closeErrorModal = () => {
        setErrorModal(false);
        setFormError("");
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div className="modBooks">
            <div className="adminViewHeader">
                <h2>Book management:</h2>
                <input
                    type="text"
                    placeholder="Search by title/author/genre"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <BookTable books={filteredUsers}
                titleSort={titleSort} authorSort={authorSort}
                genreSort={genreSort} alphaSorter={alphaSorter}
                popularitySort={popularitySort} sortByPopularity={sortByPopularity}
                setAddModal={setAddModal} setUpdateModal={setUpdateModal}
                setDeleteModal={setDeleteModal} setEditionsModal={setEditionsModal}
                setSelectedBookId={SetSelectedBookId}
            />
            {addModal && <AddBookMod closeModal={closeModal}
                                     onAdd={onAdd}
                                     setInputTitleValue={setInputTitleValue}
                                     setInputAuthorValue={setInputAuthorValue}
                                     setInputGenreValue={setInputGenreValue}
                                     inputTitleValue={inputTitleValue}
                                     inputAuthorValue={inputAuthorValue}
                                     inputGenreValue={inputGenreValue}
                                     findBookById={findBookById}
            />}
            {updateModal && <UpdateBookMod closeModal={closeModal}
                                        selectedBookId={selectedBookId} onUpdate={onUpdate}
                                        setInputAuthorValue={setInputAuthorValue}
                                        setInputGenreValue={setInputGenreValue}
                                        inputTitleValue={inputTitleValue}
                                        inputAuthorValue={inputAuthorValue}
                                        inputGenreValue={inputGenreValue}
                                        findBookById={findBookById}
            />}
            {deleteModal && <DeleteBookMod closeModal={closeModal}
                                        selectedBookId={selectedBookId} onDelete={onDelete}
            />}
            {editionsModal && <EditionsMod closeModal={closeModal}
                                        selectedBookId={selectedBookId}
                                        findBookById={findBookById}
            />}
            {errorModal && <PopupError
                                        errorText={formError}
                                        closeErrorModal={closeErrorModal}
            />}
        </div>
    );
};

export default ModBooks;