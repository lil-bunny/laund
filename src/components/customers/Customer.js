import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';

const customers = [
    {
        cs_id: 'OD54719',
        cs_name: "L Menchu",
        contact: '9046216598',
        last_order: '01 Feb 2022',
        unpaid_amount: 256.0,
        active_orders: '00',
        address: 'Flat No 301, A Wing, Blosom Society, Ujwal Co...',
    },
    {
        cs_id: 'OD54710',
        cs_name: "L Menchu",
        contact: '9046216598',
        last_order: '01 Feb 2022',
        unpaid_amount: 256.0,
        active_orders: '00',
        address: 'Flat No 301, A Wing, Blosom Society, Ujwal Co...',
    },
    {
        cs_id: 'OD54709',
        cs_name: "L Menchu",
        contact: '9046216598',
        last_order: '01 Feb 2022',
        unpaid_amount: 256.0,
        active_orders: '00',
        address: 'Flat No 301, A Wing, Blosom Society, Ujwal Co...',
    },
    {
        cs_id: 'OD54708',
        cs_name: "L Menchu",
        contact: '9046216598',
        last_order: '01 Feb 2022',
        unpaid_amount: 256.0,
        active_orders: '00',
        address: 'Flat No 301, A Wing, Blosom Society, Ujwal Co...',
    },
    {
        cs_id: 'OD54707',
        cs_name: "L Menchu",
        contact: '9046216598',
        last_order: '01 Feb 2022',
        unpaid_amount: 256.0,
        active_orders: '00',
        address: 'Flat No 301, A Wing, Blosom Society, Ujwal Co...',
    },
    {
        cs_id: 'OD54706',
        cs_name: "L Menchu",
        contact: '9046216598',
        last_order: '01 Feb 2022',
        unpaid_amount: 256.0,
        active_orders: '00',
        address: 'Flat No 301, A Wing, Blosom Society, Ujwal Co...',
    },
    {
        cs_id: 'OD54705',
        cs_name: "L Menchu",
        contact: '9046216598',
        last_order: '01 Feb 2022',
        unpaid_amount: 256.0,
        active_orders: '00',
        address: 'Flat No 301, A Wing, Blosom Society, Ujwal Co...',
    },
    {
        cs_id: 'OD54704',
        cs_name: "L Menchu",
        contact: '9046216598',
        last_order: '01 Feb 2022',
        unpaid_amount: 256.0,
        active_orders: '00',
        address: 'Flat No 301, A Wing, Blosom Society, Ujwal Co...',
    },
    {
        cs_id: 'OD54731',
        cs_name: "L Menchu",
        contact: '9046216598',
        last_order: '01 Feb 2022',
        unpaid_amount: 256.0,
        active_orders: '00',
        address: 'Flat No 301, A Wing, Blosom Society, Ujwal Co...',
    },
    {
        cs_id: 'OD54751',
        cs_name: "L Menchu",
        contact: '9046216598',
        last_order: '01 Feb 2022',
        unpaid_amount: 256.0,
        active_orders: '00',
        address: 'Flat No 301, A Wing, Blosom Society, Ujwal Co...',
    },
];

const Customer = () => {
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
            dataField: 'cs_id',
            text: 'CS ID'
        },
        {
            dataField: 'cs_name',
            text: 'CS Name'
        },
        {
            dataField: 'contact',
            text: 'Contact'
        },
        {
            dataField: 'last_order',
            text: 'Last Order'
        },
        {
            dataField: 'unpaid_amount',
            text: 'Unpaid Amount'
        },
        {
            dataField: 'active_orders',
            text: 'Active Orders'
        },
        {
            dataField: 'address',
            text: 'Address'
        },
    ];
    
    return (
        <>
            <section className="customer-panel">
                <div className="common-table">
                    <div className="table-header">
                        <div className="table-search">
                            <form className="form-inline">
                                <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                                <img src="./assets/images/search.png" alt="sort-img" />
                            </form>
                        </div>
                    </div>
                    <BootstrapTable
                        keyField='cs_id'
                        data={customers}
                        columns={columns}
                        wrapperClasses="table-responsive"
                    />
                </div>
            </section>
        </>
    )
}

export default Customer;