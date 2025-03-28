import React, {useEffect, useState} from 'react';
import {getJwt} from "../../../Utils/userData";
import OrderTable from "./Tables/OrderTable";
import EditionsOrderMod from "./Modals/OrderEditions/EditionsOrderMod";
import AddOrderMod from "./Modals/AddOrderMod";
import UpdateOrderMod from "./Modals/UpdateOrderMod";
import DeleteOrderMod from "./Modals/DeleteOrderMod";

const ModOrders = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [userSort, setUserSort] = useState(true);
    const [activitySort, setActivitySort] = useState(false);
    const [dateSort, setDateSort] = useState(true);
    const [lateFilter, setLateFilter] = useState(false);
    const [added, setAdded] = useState(false);

    const [selectedOrderId, SetSelectedOrderId] = useState(0);
    const [formError, setFormError] = useState("");
    const [returnDate, setReturnDate] = useState("");

    const [editionsModal, setEditionsModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/resources/orders', {
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
        const normalizedSearch = searchTerm.trim().toLowerCase();
        const filtered = data.filter((order) => {
            return (
                order.username.toLowerCase().includes(normalizedSearch) ||
                order.startDate.includes(normalizedSearch) ||
                order.endDate.includes(normalizedSearch) ||
                (order.returnedDate && order.returnedDate.includes(normalizedSearch))
            );
        });
        setFilteredUsers(filtered);
    }, [searchTerm, data]);

    const onUpdate = async (orderId) => {
        const order = findOrderById(orderId);
        const today = new Date().toISOString().split("T")[0];
        if (returnDate === "") {
            setFormError("Date input can't be empty!");
            return;
        }
        if (returnDate < order.startDate) {
            setFormError("Must be a date after start and until today!");
            return;
        }
        if (returnDate > today) {
            setFormError("Must be a date after start and until today!");
            return;
        }
        setFormError("");
        const requestBody = {
            "readerId":order.readerId,
            "startDate":order.startDate,
            "endDate":order.endDate,
            "returnedDate":returnDate,
            "izdanjaId":order.izdanjaId
        }
        try {
            const response = await fetch(`http://localhost:8080/api/resources/orders/update/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getJwt()}`,
                },
                body: JSON.stringify(requestBody)
            });
            if (!response.ok) {
                let errorMessage = 'Failed to update order';
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
            console.error('Error updating order:', error);
        } finally {
            closeModal();
        }
    }

    const onDelete = async (orderId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/resources/orders/delete/${orderId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getJwt()}`,
                }
            });
            if (!response.ok) {
                let errorMessage = 'Failed to delete order';
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
            console.error('Error deleting order:', error);
        } finally {
            closeModal();
        }
    }

    const sortByUser = () => {
        setFilteredUsers(prevUsers =>
            prevUsers.toSorted((a,b) => userSort ?
                a.username.localeCompare(b.username) : b.username.localeCompare(a.username))
        );
        setUserSort(prev => !prev);
    }
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
    const sortByDate = () => {
        setFilteredUsers(prevUsers =>
            prevUsers.toSorted((a,b) => {
                const dateA = new Date(a.startDate);
                const dateB = new Date(b.startDate);
                if (dateSort) {
                    return dateA - dateB;
                } else {
                    return dateB - dateA;
                }
            })
        );
        setDateSort(prev => !prev);
    }

    const filterLate = () => {
        const today = new Date();
        setFilteredUsers(prevFiltered => {
            if (lateFilter) {
                return data.filter(order =>
                    order.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    order.startDate.includes(searchTerm) ||
                    order.endDate.includes(searchTerm) ||
                    (order.returnedDate && order.returnedDate.includes(searchTerm))
                );
            } else {
                return prevFiltered.filter(order =>
                    !order.returnedDate && new Date(order.endDate) < today
                );
            }
        });
        setLateFilter(prev => !prev);
    }

    const findOrderById = () => {
        return data.find((r) => r.orderId === selectedOrderId);
    }

    const closeModal = () => {
        SetSelectedOrderId(0);
        setEditionsModal(false);
        setAddModal(false);
        setUpdateModal(false);
        setDeleteModal(false);
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div className="modOrders">
            <div className="adminViewHeader">
                <h2>Order management:</h2>
                <input
                    type="text"
                    placeholder="Search by username or date"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <OrderTable orders={filteredUsers}
                        setSelectedOrderId={SetSelectedOrderId}
                        setEditionsModal={setEditionsModal}
                        setAddModal={setAddModal}
                        setUpdateModal={setUpdateModal}
                        setDeleteModal={setDeleteModal}
                        sortByUser={sortByUser} userSort={userSort}
                        sortByActivity={sortByActivity} activitySort={activitySort}
                        sortByDate={sortByDate} dateSort={dateSort}
                        filterLate={filterLate} lateFilter={lateFilter}
            />
            {editionsModal && <EditionsOrderMod closeModal={closeModal}
                                            selectedOrderId={selectedOrderId}
                                            findOrderById={findOrderById}
            />}
            {addModal && <AddOrderMod closeModal={closeModal}
                                      setAdded={setAdded}
            />}
            {updateModal && <UpdateOrderMod closeModal={closeModal}
                                            selectedOrderId={selectedOrderId}
                                            onUpdate={onUpdate}
                                            returnDate={returnDate}
                                            setReturnDate={setReturnDate}
                                            findOrderById={findOrderById}
                                            formError={formError}
            />}
            {deleteModal && <DeleteOrderMod closeModal={closeModal}
                                            selectedOrderId={selectedOrderId}
                                            onDelete={onDelete}
            />}
        </div>
    );
};

export default ModOrders;