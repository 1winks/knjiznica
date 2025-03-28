import React from 'react';
import OrderRow from "./OrderRow";

const OrderTable = ({ orders, setSelectedOrderId,
                        setEditionsModal, setAddModal, setUpdateModal, setDeleteModal,
                        userSort, sortByUser, activitySort, sortByActivity,
                        dateSort, sortByDate, filterLate, lateFilter}) => {
    return (
        <div className="orderTable">
            <div>
                <div className="orderSorters">
                    <button className="sortButton" onClick={sortByUser}>
                        Sort By User {userSort ? "▲" : "▼"}
                    </button>
                    <button className="sortButton" onClick={sortByActivity}>
                        Sort By Activity {activitySort ? "▼" : "▲"}
                    </button>
                    <button className="sortButton" onClick={sortByDate}>
                        Sort By Date Ordered {dateSort ? "▲" : "▼"}
                    </button>
                    <button className="sortButton" onClick={filterLate}>
                        See {lateFilter ? "All Orders" : "Running Late"}
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