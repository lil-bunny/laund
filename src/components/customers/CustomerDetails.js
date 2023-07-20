import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import { NavLink } from 'react-router-dom';

const customerDetails = [
    {
        order_id: 'OD54710',
        db_name: "Sarmila K",
        order_date: '01 Feb 2023',
        cloths: '18',
        blilling_amount: '256.00',
        order_status: 'Rs. 300.00',
        payment_status: 'Not Paid',
        delivery_date: '01 Feb 2022'
    },
    {
        order_id: 'OD54711',
        db_name: "Sarmila K",
        order_date: '01 Feb 2023',
        cloths: '18',
        blilling_amount: '256.00',
        order_status: 'Rs. 300.00',
        payment_status: 'Not Paid',
        delivery_date: '01 Feb 2022'
    },
    {
        order_id: 'OD54712',
        db_name: "Sarmila K",
        order_date: '01 Feb 2023',
        cloths: '18',
        blilling_amount: '256.00',
        order_status: 'Rs. 300.00',
        payment_status: 'Not Paid',
        delivery_date: '01 Feb 2022'
    },
    {
        order_id: 'OD54713',
        db_name: "Sarmila K",
        order_date: '01 Feb 2023',
        cloths: '18',
        blilling_amount: '256.00',
        order_status: 'Rs. 300.00',
        payment_status: 'Not Paid',
        delivery_date: '01 Feb 2022'
    },
    {
        order_id: 'OD54714',
        db_name: "Sarmila K",
        order_date: '01 Feb 2023',
        cloths: '18',
        blilling_amount: '256.00',
        order_status: 'Rs. 300.00',
        payment_status: 'Not Paid',
        delivery_date: '01 Feb 2022'
    }
];

const CustomerDetails = () => {
    const indexNum = (cell, row, index) => {
        return (<div>{index + 1}</div>)
    }

    const columns = [
        {
            dataField: 'SL No',
            text: '',
            formatter: indexNum
        },
        {
            dataField: 'order_id',
            text: 'Order ID'
        },
        {
            dataField: 'db_name',
            text: 'DB Name'
        },
        {
            dataField: 'order_date',
            text: 'Order Date'
        },
        {
            dataField: 'cloths',
            text: 'Cloths'
        },
        {
            dataField: 'blilling_amount',
            text: 'Billing Amount'
        },
        {
            dataField: 'order_status',
            text: 'Order Status'
        },
        {
            dataField: 'payment_status',
            text: 'Payment Status'
        },
        {
            dataField: 'delivery_date',
            text: 'Delivery Date'
        },
        {
            dataField: 'ratings',
            text: 'Ratings'
        },
    ];

    return (
        <>
            <section className="customer-details db-details-panel">
                <h1>Customer Details</h1>
                <div className="db-details-content">
                    <div className="db-details-content-heading">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="db-id">
                                    <h2>DB12345</h2>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="cust-details-dropdown db-helper">
                                    <div className="dropdown">
                                        <div className="btn" data-bs-toggle="dropdown">
                                            <img src="./assets/images/Menu-Vertical.png" alt="menu-img" />
                                        </div>
                                        <ul className="dropdown-menu">
                                            <li><NavLink to="#" className="dropdown-item">Check service rate</NavLink></li>
                                            <li><NavLink to="#" className="dropdown-item">Order history</NavLink></li>
                                            <li><NavLink to="#" className="dropdown-item">Block</NavLink></li>
                                            <li><NavLink to="#" style={{color:'#ff0000'}} className="dropdown-item">Delete</NavLink></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="db-details-contents">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="row">
                                            <div className="col-md-8">
                                                <div className="db-details-profile">
                                                    <span className="profile-image">
                                                        <img src="./assets/images/dummy.png" alt="prof-img" />
                                                    </span>
                                                    <div className="right-prof-panel">
                                                        <h2>Rahul Sethi</h2>
                                                        <span className="db-contact">
                                                            Contact No: <span>8796231143, 9822631107</span>
                                                        </span>
                                                        <span className="db-prof-address">
                                                            Flat No 303, A Wing, Blosom Society, Ujwal Colony, Gajraj Chowk, Swargate, Pune 411041
                                                        </span>
                                                        <button className="btn btn-dark">
                                                            Rs. <span>256</span> will be adjusted in next billing amount.
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="profile-footer-border"></span>
                                    </div>
                                </div>
                                <h2>Order History</h2>
                                <BootstrapTable
                                    keyField='order_id'
                                    data={customerDetails}
                                    columns={columns}
                                    wrapperClasses="table-responsive"
                                />
                                <div className="footer-button">
                                    <button className="btn btn-sm" type="submit">CANCEL</button>
                                    <button className="btn btn-sm" type="submit">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}

export default CustomerDetails;



