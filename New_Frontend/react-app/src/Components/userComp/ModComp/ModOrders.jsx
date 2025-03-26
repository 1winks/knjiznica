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
    const [activitySort, setActivitySort] = useState(true);
    const [added, setAdded] = useState(false);

    const [selectedOrderId, SetSelectedOrderId] = useState(0);
    const [formError, setFormError] = useState("");

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

    const onAdd = () => {
        console.log("dodavanje");
        // http://localhost:8080/api/resources/orders/add
    }

    const onUpdate = () => {
        console.log("updateanje");
        // http://localhost:8080/api/resources/orders/update/{orderId}
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
            <OrderTable orders={data}
                        setSelectedOrderId={SetSelectedOrderId}
                        setEditionsModal={setEditionsModal}
                        setAddModal={setAddModal}
                        setUpdateModal={setUpdateModal}
                        setDeleteModal={setDeleteModal}
            />
            {editionsModal && <EditionsOrderMod closeModal={closeModal}
                                            selectedOrderId={selectedOrderId}
                                            findOrderById={findOrderById}
            />}
            {addModal && <AddOrderMod closeModal={closeModal}

            />}
            {updateModal && <UpdateOrderMod closeModal={closeModal}

            />}
            {deleteModal && <DeleteOrderMod closeModal={closeModal}
                                            selectedOrderId={selectedOrderId}
                                            onDelete={onDelete}
            />}
        </div>
    );
};

export default ModOrders;