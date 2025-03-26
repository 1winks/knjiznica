import React from 'react';
import OrderRow from "./OrderRow";

const OrderTable = ({ orders, setSelectedOrderId,
                        setEditionsModal, setAddModal, setUpdateModal, setDeleteModal }) => {
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
                    <button className="sortButton" onClick={() => console.log("date sort")}>
                        Sort By Date Ordered {true ? "▲" : "▼"}
                    </button>
                </div>
                <button className="adder" onClick={() => setAddModal(true)}>
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
                          setSelectedOrderId={setSelectedOrderId}
                          setEditionsModal={setEditionsModal}
                          setUpdateModal={setUpdateModal}
                          setDeleteModal={setDeleteModal}
                />
            ))}
        </div>
    );
};

export default OrderTable;