import React, { useState } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import AddModal from "../modal/AddModal";

const products = [
    {
        db_id: 'OD54781',
        db_name: "Rahul Sethi",
        dob: 'Sunil K',
        contact: '08 Dec. 2022 | 10:12 AM',
        enrollment_status: 'Yes',
        enrollment_end_date: '01 Feb 2022',
        enrollment_fee: 'Rs. 500.00',
        transaction_fee: 'Rs. 20.00', 
    },
    {
        db_id: 'OD54782',
        db_name: "Rahul Sethi",
        dob: 'Sunil K',
        contact: '08 Dec. 2022 | 10:12 AM',
        enrollment_status: 'Yes',
        enrollment_end_date: '01 Feb 2022',
        enrollment_fee: 'Rs. 500.00',
        transaction_fee: 'Rs. 20.00', 
    },
    {
        db_id: 'OD54783',
        db_name: "Rahul Sethi",
        dob: 'Sunil K',
        contact: '08 Dec. 2022 | 10:12 AM',
        enrollment_status: 'Yes',
        enrollment_end_date: '01 Feb 2022',
        enrollment_fee: 'Rs. 500.00',
        transaction_fee: 'Rs. 20.00', 
    },
    {
        db_id: 'OD54784',
        db_name: "Rahul Sethi",
        dob: 'Sunil K',
        contact: '08 Dec. 2022 | 10:12 AM',
        enrollment_status: 'Yes',
        enrollment_end_date: '01 Feb 2022',
        enrollment_fee: 'Rs. 500.00',
        transaction_fee: 'Rs. 20.00', 
    },
    {
        db_id: 'OD54785',
        db_name: "Rahul Sethi",
        dob: 'Sunil K',
        contact: '08 Dec. 2022 | 10:12 AM',
        enrollment_status: 'Yes',
        enrollment_end_date: '01 Feb 2022',
        enrollment_fee: 'Rs. 500.00',
        transaction_fee: 'Rs. 20.00', 
    },
    {
        db_id: 'OD54786',
        db_name: "Rahul Sethi",
        dob: 'Sunil K',
        contact: '08 Dec. 2022 | 10:12 AM',
        enrollment_status: 'Yes',
        enrollment_end_date: '01 Feb 2022',
        enrollment_fee: 'Rs. 500.00',
        transaction_fee: 'Rs. 20.00', 
    },
    {
        db_id: 'OD54787',
        db_name: "Rahul Sethi",
        dob: 'Sunil K',
        contact: '08 Dec. 2022 | 10:12 AM',
        enrollment_status: 'Yes',
        enrollment_end_date: '01 Feb 2022',
        enrollment_fee: 'Rs. 500.00',
        transaction_fee: 'Rs. 20.00', 
    },
    {
        db_id: 'OD54788',
        db_name: "Rahul Sethi",
        dob: 'Sunil K',
        contact: '08 Dec. 2022 | 10:12 AM',
        enrollment_status: 'Yes',
        enrollment_end_date: '01 Feb 2022',
        enrollment_fee: 'Rs. 500.00',
        transaction_fee: 'Rs. 20.00', 
    },
    {
        db_id: 'OD54789',
        db_name: "Rahul Sethi",
        dob: 'Sunil K',
        contact: '08 Dec. 2022 | 10:12 AM',
        enrollment_status: 'Yes',
        enrollment_end_date: '01 Feb 2022',
        enrollment_fee: 'Rs. 500.00',
        transaction_fee: 'Rs. 20.00', 
    },
    {
        db_id: 'OD54710',
        db_name: "Rahul Sethi",
        dob: 'Sunil K',
        contact: '08 Dec. 2022 | 10:12 AM',
        enrollment_status: 'Yes',
        enrollment_end_date: '01 Feb 2022',
        enrollment_fee: 'Rs. 500.00',
        transaction_fee: 'Rs. 20.00', 
    },
];

const DeliveryBoy = () =>{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const columns = [
        {
            dataField: 'db_id',
            text: 'DB ID.',
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                  setShow(true);
                }
            }
        },
        {
            dataField: 'db_name',
            text: 'DB Name'
        },
        {
            dataField: 'dob',
            text: 'DOB'
        },
        {
            dataField: 'contact',
            text: 'Contact'
        },
        {
            dataField: 'enrollment_status',
            text: 'Enrollment Status'
        },
        {
            dataField: 'enrollment_end_date',
            text: 'Enrollment End Date'
        },
        {
            dataField: 'enrollment_fee',
            text: 'Enrollment Fee'
        },
        {
            dataField: 'transaction_fee',
            text: 'Transaction Fee'
        },
    ];

    return(
        <>
            <section className="delivery-boy-panel">
                <div className="order-panel-table">
                    <div className="table-header">
                        <div className="table-search">
                            <form className="form-inline">
                                <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                                <img src="./assets/images/search.png" alt="sort-img" />
                            </form>
                        </div>
                        <div className="select-dropdown table-select">
                            <img src="./assets/images/sort-down-small.png" alt="sort-img" />
                            <select className="select">
                                <option value="">Status</option>
                                <option value="1">Status 1</option>
                                <option value="2">Status 2</option>
                                <option value="3">Status 3</option>
                            </select>
                        </div>
                    </div>
                    <BootstrapTable
                        keyField='db_id'
                        data={products}
                        columns={columns}
                        wrapperClasses="table-responsive"
                    />
                </div>
            </section>
            <AddModal show={show} onHide={handleClose}  />
        </>
    )
}

export default DeliveryBoy;