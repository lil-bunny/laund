import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import { DateRangePicker } from 'rsuite';

const payments = [
    {
        transaction_id: 'TID54710',
        transaction_date: "17th Jan 1989",
        amount: '230.00',
        payment_from: 'CS Rahul Shetty',
        payment_to: 'DB Sharmila K',
        payment_mode: 'UPI/Google Pe',
        payment_status: 'Settled',
    },
    {
        transaction_id: 'TID54711',
        transaction_date: "17th Jan 1989",
        amount: '230.00',
        payment_from: 'CS Rahul Shetty',
        payment_to: 'DB Sharmila K',
        payment_mode: 'UPI/Google Pe',
        payment_status: 'Settled',
    },
    {
        transaction_id: 'TID54712',
        transaction_date: "17th Jan 1989",
        amount: '230.00',
        payment_from: 'CS Rahul Shetty',
        payment_to: 'DB Sharmila K',
        payment_mode: 'UPI/Google Pe',
        payment_status: 'Settled',
    },
    {
        transaction_id: 'TID54713',
        transaction_date: "17th Jan 1989",
        amount: '230.00',
        payment_from: 'CS Rahul Shetty',
        payment_to: 'DB Sharmila K',
        payment_mode: 'UPI/Google Pe',
        payment_status: 'Settled',
    },
    {
        transaction_id: 'TID54714',
        transaction_date: "17th Jan 1989",
        amount: '230.00',
        payment_from: 'CS Rahul Shetty',
        payment_to: 'DB Sharmila K',
        payment_mode: 'UPI/Google Pe',
        payment_status: 'Settled',
    },
    {
        transaction_id: 'TID54715',
        transaction_date: "17th Jan 1989",
        amount: '230.00',
        payment_from: 'CS Rahul Shetty',
        payment_to: 'DB Sharmila K',
        payment_mode: 'UPI/Google Pe',
        payment_status: 'Settled',
    },
    {
        transaction_id: 'TID54716',
        transaction_date: "17th Jan 1989",
        amount: '230.00',
        payment_from: 'CS Rahul Shetty',
        payment_to: 'DB Sharmila K',
        payment_mode: 'UPI/Google Pe',
        payment_status: 'Settled',
    },
    {
        transaction_id: 'TID54717',
        transaction_date: "17th Jan 1989",
        amount: '230.00',
        payment_from: 'CS Rahul Shetty',
        payment_to: 'DB Sharmila K',
        payment_mode: 'UPI/Google Pe',
        payment_status: 'Settled',
    },
    {
        transaction_id: 'TID54718',
        transaction_date: "17th Jan 1989",
        amount: '230.00',
        payment_from: 'CS Rahul Shetty',
        payment_to: 'DB Sharmila K',
        payment_mode: 'UPI/Google Pe',
        payment_status: 'Settled',
    },
    {
        transaction_id: 'TID54719',
        transaction_date: "17th Jan 1989",
        amount: '230.00',
        payment_from: 'CS Rahul Shetty',
        payment_to: 'DB Sharmila K',
        payment_mode: 'UPI/Google Pe',
        payment_status: 'Settled',
    },
];

const Payment = () =>{
    const indexNum = (cell, row, index) => {
        return (<div>{index+1}</div>) 
    }
    
    const columns = [
        {
            dataField: 'SL No',
            text: '',
            formatter: indexNum
        },
        {
            dataField: 'transaction_id',
            text: 'Transaction ID'
        },
        {
            dataField: 'transaction_date',
            text: 'Transaction Date'
        },
        {
            dataField: 'amount',
            text: 'Amount'
        },
        {
            dataField: 'payment_from',
            text: 'Payment From'
        },
        {
            dataField: 'payment_to',
            text: 'Payment To'
        },
        {
            dataField: 'payment_mode',
            text: 'Payment Mode'
        },
        {
            dataField: 'payment_status',
            text: 'Payment Status'
        },
    ];
    
    return(
        <>
            <section className="payment-panel">
                <div className="common-table">
                    <div className="table-header">
                        <div className="table-search">
                            <form className="form-inline">
                                <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                                <img src="./assets/images/search.png" alt="sort-img" />
                            </form>
                        </div>
                        <div className="select-dropdown table-select">
                            <DateRangePicker
                                format="dd/MM/yyyy"
                            />
                        </div>
                        <div className="select-dropdown table-select">
                            <img src="./assets/images/sort-down-small.png" alt="sort-img" />
                            <select className="select">
                                <option value="1">Todays</option>
                                <option value="2">Yesterday</option>
                                <option value="3">Tomorrow</option>
                            </select>
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
                        keyField='transaction_id'
                        data={payments}
                        columns={columns}
                        wrapperClasses="table-responsive"
                    />
                </div>
            </section>
        </>
    )
}

export default Payment;