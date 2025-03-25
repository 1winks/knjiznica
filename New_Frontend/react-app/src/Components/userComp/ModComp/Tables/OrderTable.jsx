import React from 'react';
import OrderRow from "./OrderRow";

const OrderTable = ({ orders, setSelectedOrderId, getEditions }) => {
    return (
        <div className="orderTable">
            <div>
                <div className="orderSorters">
                    <button className="sortButton" onClick={() => console.log("user sort")}>
                        Sort By User {true ? "▲" : "▼"}
                    </button>
                    <button className="sortButton" onClick={() => console.log("activity sort")}>
                        Sort By Activity {true ? "▲" : "▼"}
                    </button>
                </div>
                <button className="adder" onClick={() => console.log("add")}>
                    Add
                </button>
            </div>
            <div className="orderTableHeader">
                <div>Username:</div>
                <div>Returned:</div>
                <div>Start date:</div>
                <div>End date:</div>
                <div>Actions:</div>
            </div>
            {orders.map(order => (
                <OrderRow key={order.orderId} {...order}
                          setSelectedOrderId={setSelectedOrderId} getEditions={getEditions}
                />
            ))}
        </div>
    );
};

export default OrderTable;