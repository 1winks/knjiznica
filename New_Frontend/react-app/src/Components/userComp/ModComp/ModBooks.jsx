import React, {useEffect, useState} from 'react';
import BookTable from "./Tables/BookTable";
import {getJwt} from "../../../Utils/userData";
import AddBookMod from "./Modals/AddBookMod";
import DeleteBookMod from "./Modals/DeleteBookMod";
import UpdateBookMod from "./Modals/UpdateBookMod";
import EditionsMod from "./Modals/BookEditions/EditionsMod";

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


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/resources/books', {
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
            book.author.toLowerCase().includes(searchTerm.toLowerCase())
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
            setFormError("Input cannot be empty!");
            return;
        } else {
            setFormError("");
        }
        try {
            const response = await fetch(
                `http://localhost:8080/api/resources/books/add`, {
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
                throw new Error('Failed to fetch data');
            }
            setAdded(prevAdded => !prevAdded);
        } catch (err) {
            setError(error.message);
        } finally {
            closeModal();
        }
    }

    const onUpdate = async (bookId) => {
        if (inputAuthorValue.trim() === "" || inputTitleValue.trim() === "" || inputGenreValue.trim() === "") {
            setFormError("Input cannot be empty!");
            return;
        } else {
            setFormError("");
        }
        try {
            const response = await fetch(
                `http://localhost:8080/api/resources/books/update/${bookId}`, {
                    method: 'PUT',
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
                throw new Error('Failed to fetch data');
            }
            setAdded(prevAdded => !prevAdded);
        } catch (err) {
            setError(error.message);
        } finally {
            closeModal();
        }
    }

    const onDelete = async (bookId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/resources/books/delete/${bookId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getJwt()}`,
                }
            });
            if (!response.ok) {
                let errorMessage = 'Failed to delete book';
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorMessage;
                } else {
                    errorMessage = await response.text();
                }
                console.log(errorMessage);
                throw new Error(errorMessage);
            }
            setAdded(prevAdded => !prevAdded);
        } catch (error) {
            setError(error.message);
            console.error('Error deleting book:', error);
        } finally {
            closeModal();
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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div className="modBooks">
            <div className="adminViewHeader">
                <h2>Book management:</h2>
                <input
                    type="text"
                    placeholder="Search by title or author"
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
            {addModal && <AddBookMod closeModal={closeModal} formError={formError}
                                     onAdd={onAdd}
                                     setInputTitleValue={setInputTitleValue}
                                     setInputAuthorValue={setInputAuthorValue}
                                     setInputGenreValue={setInputGenreValue}
                                     inputTitleValue={inputTitleValue}
                                     inputAuthorValue={inputAuthorValue}
                                     inputGenreValue={inputGenreValue}
                                     findBookById={findBookById}
            />}
            {updateModal && <UpdateBookMod closeModal={closeModal} formError={formError}
                                        selectedBookId={selectedBookId} onUpdate={onUpdate}
                                        setInputTitleValue={setInputTitleValue}
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
        </div>
    );
};

export default ModBooks;