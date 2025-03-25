import React, {useEffect, useState} from 'react';
import {getJwt} from "../../../Utils/userData";
import OrderTable from "./Tables/OrderTable";

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

    const getEditions = (orderId) => {
        console.log("Editions");
        console.log(orderId);
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
                        getEditions={getEditions}/>
        </div>
    );
};

export default ModOrders;