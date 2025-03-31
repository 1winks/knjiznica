import React, {useEffect, useState} from 'react';
import {getJwt, getUsernameFromJwt} from "../../../Utils/userData";
import UserOrdersTable from "./Tables/UserOrdersTable";
import OrderEditionModal from "./Modals/OrderEditionModal";

const UserOrders = () => {
    const username = getUsernameFromJwt();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [dateSort, setDateSort] = useState(true);
    const [activitySort, setActivitySort] = useState(true);

    const [selectedEditions, setSelectedEditions] = useState([]);
    const [selectedStart, setSelectedStart] = useState("");
    const [booksModal, setBooksModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/resources/orders/orderuser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${getJwt()}`
                    },
                    body: JSON.stringify({
                        username: username
                    })
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
    }, []);

    useEffect(() => {
        const filtered = data.filter((order) =>
            order.startDate.includes(searchTerm) ||
            order.endDate.includes(searchTerm)
        );
        setFilteredUsers(filtered);
    }, [searchTerm, data]);

    const sortByDate = () => {
        setFilteredUsers(prevUsers =>
            [...prevUsers].toSorted((a, b) =>
                dateSort
                    ? new Date(a.startDate) - new Date(b.startDate)
                    : new Date(b.startDate) - new Date(a.startDate)
            )
        );
        setDateSort(prev => !prev);
    };

    const sortByActivity = () => {
        setFilteredUsers(prevUsers =>
            prevUsers.toSorted((a,b) => {
                if (activitySort) {
                    if (a.returnedDate === null && b.returnedDate !== null) return -1;
                    if (a.returnedDate !== null && b.returnedDate === null) return 1;
                } else {
                    if (a.returnedDate === null && b.returnedDate !== null) return 1;
                    if (a.returnedDate !== null && b.returnedDate === null) return -1;
                }
                return 0;
            })
        );
        setActivitySort(prev => !prev);
    }

    const closeModal = () => {
        setSelectedEditions([]);
        setSelectedStart("");
        setBooksModal(false);
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div className="modBooks">
            <div className="adminViewHeader">
                <h2>My orders:</h2>
                <input
                    type="text"
                    placeholder="Search by date"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <UserOrdersTable orders={filteredUsers}
                                dateSort={dateSort} sortByDate={sortByDate}
                                activitySort={activitySort} sortByActivity={sortByActivity}
                                setSelectedEditions={setSelectedEditions}
                                setSelectedStart={setSelectedStart}
                                setBooksModal={setBooksModal}
            />
            {booksModal && <OrderEditionModal closeModal={closeModal}
                    selectedEditions={selectedEditions} selectedStart={selectedStart}
            />}
        </div>
    );
};

export default UserOrders;