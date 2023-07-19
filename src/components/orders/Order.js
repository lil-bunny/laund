import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import { DateRangePicker } from 'rsuite';

const products = [
    {
        order_id: 'OD54781',
        cs_name: "Rahul Sethi",
        db_name: 'Hozefa',
        helper_name: 'Sunil K',
        pickup_request: '08 Dec. 2022 | 10:12 AM',
        pickup_status: 'Yes',
        cloth_count: 18,
        self_serve: 10,
        ls_serve: 8,
        accept_by_ls: '08 Dec. 2022 | 10:12 AM',
        ls_name: "Swacth laundry Services",
        ready_by_ls: '08 Dec. 2022 | 10:12 AM',
        ls_raised_issue: "No Issue",
        picked_from_ls: '08 Dec. 2022 | 10:12 AM',
        proposed_delivery_date: '10 Dec. 2022 | 10:12 AM',
        delivery_status: "Successfully",
        bill_amount: 355.0,
        payment_status: "Unpaid",
        ratings_by_cs: '*****',
        comments: "Lorel ipsum dolor sit amet, consectetor"
    },
    {
        order_id: 'OD5498',
        cs_name: "Vinayak G",
        db_name: 'Sarmila K',
        helper_name: 'L Manchu',
        pickup_request: '08 Dec. 2022 | 10:12 AM',
        pickup_status: 'Yes',
        cloth_count: 18,
        self_serve: 10,
        ls_serve: 8,
        accept_by_ls: '08 Dec. 2022 | 10:12 AM',
        ls_name: "Swacth laundry Services",
        ready_by_ls: '08 Dec. 2022 | 10:12 AM',
        ls_raised_issue: "No Issue",
        picked_from_ls: '08 Dec. 2022 | 10:12 AM',
        proposed_delivery_date: '10 Dec. 2022 | 10:12 AM',
        delivery_status: "Successfully",
        bill_amount: 355.0,
        payment_status: "Unpaid",
        ratings_by_cs: '*****',
        comments: "Lorel ipsum dolor sit amet, consectetor"
    },
    {
        order_id: 'OD56219',
        cs_name: "Prateek K",
        db_name: 'Hozefa',
        helper_name: 'L Manchu',
        pickup_request: '08 Dec. 2022 | 10:12 AM',
        pickup_status: 'Yes',
        cloth_count: 18,
        self_serve: 10,
        ls_serve: 8,
        accept_by_ls: '08 Dec. 2022 | 10:12 AM',
        ls_name: "Swacth laundry Services",
        ready_by_ls: '08 Dec. 2022 | 10:12 AM',
        ls_raised_issue: "No Issue",
        picked_from_ls: '08 Dec. 2022 | 10:12 AM',
        proposed_delivery_date: '10 Dec. 2022 | 10:12 AM',
        delivery_status: "Successfully",
        bill_amount: 355.0,
        payment_status: "Unpaid",
        ratings_by_cs: '*****',
        comments: "Lorel ipsum dolor sit amet, consectetor"
    },
    {
        order_id: 'OD56211',
        cs_name: "Prateek K",
        db_name: 'Hozefa',
        helper_name: 'L Manchu',
        pickup_request: '08 Dec. 2022 | 10:12 AM',
        pickup_status: 'Yes',
        cloth_count: 18,
        self_serve: 10,
        ls_serve: 8,
        accept_by_ls: '08 Dec. 2022 | 10:12 AM',
        ls_name: "Swacth laundry Services",
        ready_by_ls: '08 Dec. 2022 | 10:12 AM',
        ls_raised_issue: "No Issue",
        picked_from_ls: '08 Dec. 2022 | 10:12 AM',
        proposed_delivery_date: '10 Dec. 2022 | 10:12 AM',
        delivery_status: "Successfully",
        bill_amount: 355.0,
        payment_status: "Unpaid",
        ratings_by_cs: '*****',
        comments: "Lorel ipsum dolor sit amet, consectetor"
    },
    {
        order_id: 'OD56212',
        cs_name: "Prateek K",
        db_name: 'Hozefa',
        helper_name: 'L Manchu',
        pickup_request: '08 Dec. 2022 | 10:12 AM',
        pickup_status: 'Yes',
        cloth_count: 18,
        self_serve: 10,
        ls_serve: 8,
        accept_by_ls: '08 Dec. 2022 | 10:12 AM',
        ls_name: "Swacth laundry Services",
        ready_by_ls: '08 Dec. 2022 | 10:12 AM',
        ls_raised_issue: "No Issue",
        picked_from_ls: '08 Dec. 2022 | 10:12 AM',
        proposed_delivery_date: '10 Dec. 2022 | 10:12 AM',
        delivery_status: "Successfully",
        bill_amount: 355.0,
        payment_status: "Unpaid",
        ratings_by_cs: '*****',
        comments: "Lorel ipsum dolor sit amet, consectetor"
    },
    {
        order_id: 'OD56213',
        cs_name: "Prateek K",
        db_name: 'Hozefa',
        helper_name: 'L Manchu',
        pickup_request: '08 Dec. 2022 | 10:12 AM',
        pickup_status: 'Yes',
        cloth_count: 18,
        self_serve: 10,
        ls_serve: 8,
        accept_by_ls: '08 Dec. 2022 | 10:12 AM',
        ls_name: "Swacth laundry Services",
        ready_by_ls: '08 Dec. 2022 | 10:12 AM',
        ls_raised_issue: "No Issue",
        picked_from_ls: '08 Dec. 2022 | 10:12 AM',
        proposed_delivery_date: '10 Dec. 2022 | 10:12 AM',
        delivery_status: "Successfully",
        bill_amount: 355.0,
        payment_status: "Unpaid",
        ratings_by_cs: '*****',
        comments: "Lorel ipsum dolor sit amet, consectetor"
    },
    {
        order_id: 'OD56214',
        cs_name: "Prateek K",
        db_name: 'Hozefa',
        helper_name: 'L Manchu',
        pickup_request: '08 Dec. 2022 | 10:12 AM',
        pickup_status: 'Yes',
        cloth_count: 18,
        self_serve: 10,
        ls_serve: 8,
        accept_by_ls: '08 Dec. 2022 | 10:12 AM',
        ls_name: "Swacth laundry Services",
        ready_by_ls: '08 Dec. 2022 | 10:12 AM',
        ls_raised_issue: "No Issue",
        picked_from_ls: '08 Dec. 2022 | 10:12 AM',
        proposed_delivery_date: '10 Dec. 2022 | 10:12 AM',
        delivery_status: "Successfully",
        bill_amount: 355.0,
        payment_status: "Unpaid",
        ratings_by_cs: '*****',
        comments: "Lorel ipsum dolor sit amet, consectetor"
    },
    {
        order_id: 'OD56215',
        cs_name: "Prateek K",
        db_name: 'Hozefa',
        helper_name: 'L Manchu',
        pickup_request: '08 Dec. 2022 | 10:12 AM',
        pickup_status: 'Yes',
        cloth_count: 18,
        self_serve: 10,
        ls_serve: 8,
        accept_by_ls: '08 Dec. 2022 | 10:12 AM',
        ls_name: "Swacth laundry Services",
        ready_by_ls: '08 Dec. 2022 | 10:12 AM',
        ls_raised_issue: "No Issue",
        picked_from_ls: '08 Dec. 2022 | 10:12 AM',
        proposed_delivery_date: '10 Dec. 2022 | 10:12 AM',
        delivery_status: "Successfully",
        bill_amount: 355.0,
        payment_status: "Unpaid",
        ratings_by_cs: '*****',
        comments: "Lorel ipsum dolor sit amet, consectetor"
    },
    {
        order_id: 'OD56216',
        cs_name: "Prateek K",
        db_name: 'Hozefa',
        helper_name: 'L Manchu',
        pickup_request: '08 Dec. 2022 | 10:12 AM',
        pickup_status: 'Yes',
        cloth_count: 18,
        self_serve: 10,
        ls_serve: 8,
        accept_by_ls: '08 Dec. 2022 | 10:12 AM',
        ls_name: "Swacth laundry Services",
        ready_by_ls: '08 Dec. 2022 | 10:12 AM',
        ls_raised_issue: "No Issue",
        picked_from_ls: '08 Dec. 2022 | 10:12 AM',
        proposed_delivery_date: '10 Dec. 2022 | 10:12 AM',
        delivery_status: "Successfully",
        bill_amount: 355.0,
        payment_status: "Unpaid",
        ratings_by_cs: '*****',
        comments: "Lorel ipsum dolor sit amet, consectetor"
    },
    {
        order_id: 'OD56208',
        cs_name: "Prateek K",
        db_name: 'Hozefa',
        helper_name: 'L Manchu',
        pickup_request: '08 Dec. 2022 | 10:12 AM',
        pickup_status: 'Yes',
        cloth_count: 18,
        self_serve: 10,
        ls_serve: 8,
        accept_by_ls: '08 Dec. 2022 | 10:12 AM',
        ls_name: "Swacth laundry Services",
        ready_by_ls: '08 Dec. 2022 | 10:12 AM',
        ls_raised_issue: "No Issue",
        picked_from_ls: '08 Dec. 2022 | 10:12 AM',
        proposed_delivery_date: '10 Dec. 2022 | 10:12 AM',
        delivery_status: "Successfully",
        bill_amount: 355.0,
        payment_status: "Unpaid",
        ratings_by_cs: '*****',
        comments: "Lorel ipsum dolor sit amet, consectetor"
    },
];

const Order = () => {
    const columns = [
        {
            dataField: 'order_id',
            text: 'Order ID'
        },
        {
            dataField: 'cs_name',
            text: 'CS Name'
        },
        {
            dataField: 'db_name',
            text: 'DB Name'
        },
        {
            dataField: 'helper_name',
            text: 'Helper Name'
        },
        {
            dataField: 'pickup_request',
            text: 'Pickup Request'
        },
        {
            dataField: 'pickup_status',
            text: 'Pickup Status'
        },
        {
            dataField: 'cloth_count',
            text: 'Cloth Count'
        },
        {
            dataField: 'self_serve',
            text: 'Self Serve'
        },
        {
            dataField: 'ls_serve',
            text: 'LS Serve'
        },
        {
            dataField: 'accept_by_ls',
            text: 'Accept by LS'
        },
        {
            dataField: 'ls_name',
            text: 'LS Name'
        },
        {
            dataField: 'ready_by_ls',
            text: 'Ready By LS'
        },
        {
            dataField: 'ls_raised_issue',
            text: 'LS Raised Issue'
        },
        {
            dataField: 'picked_from_ls',
            text: 'Picked from LS'
        },
        {
            dataField: 'proposed_delivery_date',
            text: 'Proposed Delivery Date'
        },
        {
            dataField: 'delivery_status',
            text: 'Delivery Status'
        },
        {
            dataField: 'bill_amount',
            text: 'Bill Amount'
        },
        {
            dataField: 'payment_status',
            text: 'Payment Status'
        },
        {
            dataField: 'ratings_by_cs',
            text: 'Ratings by CS'
        },
        {
            dataField: 'comments',
            text: 'Comments'
        },
    
    ];
    
    return (
        <>
            <section className="order-panel">
                <h1>Order</h1>
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
                                <option value="">By Type</option>
                                <option value="1">Type 1</option>
                                <option value="2">Type 2</option>
                                <option value="3">Type 3</option>
                            </select>
                        </div>
                        <div className="select-dropdown table-select">
                            <img src="./assets/images/sort-down-small.png" alt="sort-img" />
                            <select className="select">
                                <option value="">Select DB</option>
                                <option value="1">DB 1</option>
                                <option value="2">DB 2</option>
                                <option value="3">DB 3</option>
                            </select>
                        </div>
                        <div className="select-dropdown table-select">
                            <img src="./assets/images/sort-down-small.png" alt="sort-img" />
                            <select className="select">
                                <option value="">Select Helper</option>
                                <option value="1">Helper 1</option>
                                <option value="2">Helper 2</option>
                                <option value="3">helper 3</option>
                            </select>
                        </div>
                        <div className="select-dropdown table-select">
                            <img src="./assets/images/sort-down-small.png" alt="sort-img" />
                            <select className="select">
                                <option value="">Delivery Status</option>
                                <option value="1">Status 1</option>
                                <option value="2">Status 2</option>
                                <option value="3">Status 3</option>
                            </select>
                        </div>
                        <div className="select-dropdown table-select">
                            <img src="./assets/images/sort-down-small.png" alt="sort-img" />
                            <select className="select">
                                <option value="">Payment Status</option>
                                <option value="1">Status 1</option>
                                <option value="2">Status 2</option>
                                <option value="3">Status 3</option>
                            </select>
                        </div>
                        <div className="select-dropdown table-select">
                            <DateRangePicker
                                format="dd/MM/yyyy"
                            />
                        </div>
                    </div>
                    <BootstrapTable
                        keyField='order_id'
                        data={products}
                        columns={columns}
                        wrapperClasses="table-responsive"
                    />
                </div>
            </section>
        </>
    )
}

export default Order;