import React from 'react';
import UserOrdersRow from "./UserOrdersRow";

const UserOrdersTable = ({ orders, sortByDate, dateSort, sortByActivity, activitySort,
                             setBooksModal, setSelectedEditions, setSelectedStart}) => {
    return (
        <div className="bookTable">
            <div>
                <div className="bookSorters">
                    <button className="sortButton" onClick={sortByDate}>
                        Sort By Start-Date {dateSort ? "▲" : "▼"}
                    </button>
                    <button className="sortButton" onClick={sortByActivity}>
                        Sort By Active {activitySort ? "▲" : "▼"}
                    </button>
                </div>
            </div>
            <div className="userOrderTableHeader">
                <div>Start-Date:</div>
                <div>End-Date:</div>
                <div>Returned:</div>
                <div>Books:</div>
            </div>
            {orders.map(order => (
                <UserOrdersRow key={order} {...order}
                               setBooksModal={setBooksModal}
                               setSelectedEditions={setSelectedEditions}
                               setSelectedStart={setSelectedStart}
                />
            ))}
        </div>
    );
};

export default UserOrdersTable;