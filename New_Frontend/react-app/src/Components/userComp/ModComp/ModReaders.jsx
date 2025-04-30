import React, {useEffect, useState} from 'react';
import {getJwt} from "../../../Utils/userData";
import ReaderTable from "./Tables/ReaderTable";
import ReaderRenewModal from "./Modals/ReaderRenewModal";
import ReaderUpdateModal from "./Modals/ReaderUpdateModal";
import PopupError from "../PopupError";

const apiUrl = process.env.REACT_APP_API_URL;

const ModReaders = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [nameSort, setNameSort] = useState(true);
    const [emailSort, setEmailSort] = useState(true);

    const [modal, setModal] = useState(false);
    const [formError, setFormError] = useState("");
    const [errorModal, setErrorModal] = useState(false);
    const [selectedReaderId, SetSelectedReaderId] = useState(0);
    const [inputAddressValue, setInputAddressValue] = useState("");
    const [inputPhoneValue, setInputPhoneValue] = useState("");

    const [added, setAdded] = useState(false);
    const [renewModal, setRenewModal] = useState(false);

    const phoneRegex = /^(\+385\s?|0)(\d{1,3})([\s\-]?\d{3,4}){1,2}$/;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/resources/readers`, {
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
        const filtered = data.filter((reader) =>
            reader.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reader.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [searchTerm, data]);

    const onUpdate = async (readerId) => {
        if (inputAddressValue.trim() === "" || inputPhoneValue.trim() === "") {
            setFormError("Input can't be empty!");
            setErrorModal(true);
            return;
        }
        if (!phoneRegex.test(inputPhoneValue.trim())) {
            const examplePhone =
                "\nHelp: using the croatian format\n" +
                "+385 XX XXX XXXX\n" +
                "0XX XXX XXXX\n" +
                "01-XXX-XXXX\n" +
                "0XX XXX XXX\n" +
                "+385XX-XXX-XXXX\n" +
                "(Where X is 0-9)";
            setFormError("Please enter a valid phone number!" + examplePhone);
            setErrorModal(true);
            return;
        }
        setFormError("");
        try {
            const response = await fetch(
                `${apiUrl}/api/resources/readers/update/${readerId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getJwt()}`
                },
                body: JSON.stringify({
                    address: inputAddressValue,
                    phoneNumber: inputPhoneValue
                })
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to renew membership');
            }
            console.log("Success updating!");
            setAdded(prevState => !prevState);
            closeModal();
        } catch (error) {
            setFormError(error.message || "Unknown error occurred");
            setErrorModal(true);
            console.error("Error:", error);
        }
    }

    const sortNames = () => {
        setFilteredUsers(prevUsers =>
            prevUsers.toSorted((a,b) => nameSort ?
                a.username.localeCompare(b.username) : b.username.localeCompare(a.username)));
        setNameSort(prev => !prev);
    }
    const sortEmails = () => {
        setFilteredUsers(prevUsers =>
            prevUsers.toSorted((a,b) => emailSort ?
                a.email.localeCompare(b.email) : b.email.localeCompare(a.email)));
        setEmailSort(prev => !prev);
    }

    const closeModal = () => {
        SetSelectedReaderId(0);
        setInputAddressValue('');
        setInputPhoneValue('');
        setModal(false);
        setRenewModal(false);
    }

    const findReaderById = () => {
        return data.find((r) => r.readerId === selectedReaderId);
    }

    const closeErrorModal = () => {
        setErrorModal(false);
        setFormError("");
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div className="modReaders">
            <div className="adminViewHeader">
                <h2>Reader management:</h2>
                <input
                    type="text"
                    placeholder="Search by username or e-mail"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <ReaderTable readers={filteredUsers}
                         onUpdate={() => setModal(true)}
                         onPay={() => setRenewModal(true)}
                         nameSort={nameSort} sortNames={sortNames}
                         sortEmails={sortEmails} emailSort={emailSort}
                         SetSelectedReaderId={SetSelectedReaderId}
            />
            {modal && <ReaderUpdateModal
                        closeModal={closeModal}
                        selectedReaderId={selectedReaderId}
                        findReaderById={findReaderById}
                        inputAddressValue={inputAddressValue}
                        setInputAddressValue={setInputAddressValue}
                        inputPhoneValue={inputPhoneValue}
                        setInputPhoneValue={setInputPhoneValue}
                        onUpdate={onUpdate}
                        formError={formError}
            />}
            {renewModal && <ReaderRenewModal
                        closeModal={closeModal}
                        selectedReaderId={selectedReaderId}
                        setAdded={setAdded}
                        findReaderById={findReaderById}
            />}
            {errorModal && <PopupError
                                    closeErrorModal={closeErrorModal}
                                    errorText={formError}
            />}
        </div>
    );
};

export default ModReaders;