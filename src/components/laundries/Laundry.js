import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';

const laundries = [
    {
        ls_id: 'OD54719',
        ls_name: "L Menchu",
        holidays: '17th Jan 1989',
        contact: '9046216598',
        enrollment_status: 'Active',
        enrollment_end_date: '01 Feb 2022',
        enrollment_fee: 'Rs. 300.00',
        owner_name: 'Hozefa', 
    },
    {
        ls_id: 'OD54710',
        ls_name: "L Menchu",
        holidays: '17th Jan 1989',
        contact: '9046216598',
        enrollment_status: 'Active',
        enrollment_end_date: '01 Feb 2022',
        enrollment_fee: 'Rs. 300.00',
        owner_name: 'Hozefa', 
    },
    {
        ls_id: 'OD54709',
        ls_name: "L Menchu",
        holidays: '17th Jan 1989',
        contact: '9046216598',
        enrollment_status: 'Active',
        enrollment_end_date: '01 Feb 2022',
        enrollment_fee: 'Rs. 300.00',
        owner_name: 'Hozefa', 
    },
    {
        ls_id: 'OD54708',
        ls_name: "L Menchu",
        holidays: '17th Jan 1989',
        contact: '9046216598',
        enrollment_status: 'Active',
        enrollment_end_date: '01 Feb 2022',
        enrollment_fee: 'Rs. 300.00',
        owner_name: 'Hozefa', 
    },
    {
        ls_id: 'OD54707',
        ls_name: "L Menchu",
        holidays: '17th Jan 1989',
        contact: '9046216598',
        enrollment_status: 'Active',
        enrollment_end_date: '01 Feb 2022',
        enrollment_fee: 'Rs. 300.00',
        owner_name: 'Hozefa', 
    },
    {
        ls_id: 'OD54706',
        ls_name: "L Menchu",
        holidays: '17th Jan 1989',
        contact: '9046216598',
        enrollment_status: 'Active',
        enrollment_end_date: '01 Feb 2022',
        enrollment_fee: 'Rs. 300.00',
        owner_name: 'Hozefa', 
    },
    {
        ls_id: 'OD54705',
        ls_name: "L Menchu",
        holidays: '17th Jan 1989',
        contact: '9046216598',
        enrollment_status: 'Active',
        enrollment_end_date: '01 Feb 2022',
        enrollment_fee: 'Rs. 300.00',
        owner_name: 'Hozefa', 
    },
    {
        ls_id: 'OD54704',
        ls_name: "L Menchu",
        holidays: '17th Jan 1989',
        contact: '9046216598',
        enrollment_status: 'Active',
        enrollment_end_date: '01 Feb 2022',
        enrollment_fee: 'Rs. 300.00',
        owner_name: 'Hozefa', 
    },
    {
        ls_id: 'OD54731',
        ls_name: "L Menchu",
        holidays: '17th Jan 1989',
        contact: '9046216598',
        enrollment_status: 'Active',
        enrollment_end_date: '01 Feb 2022',
        enrollment_fee: 'Rs. 300.00',
        owner_name: 'Hozefa', 
    },
    {
        ls_id: 'OD54751',
        ls_name: "L Menchu",
        holidays: '17th Jan 1989',
        contact: '9046216598',
        enrollment_status: 'Active',
        enrollment_end_date: '01 Feb 2022',
        enrollment_fee: 'Rs. 300.00',
        owner_name: 'Hozefa', 
    },
];

const Laundry = () => {
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
            dataField: 'ls_id',
            text: 'LS ID'
        },
        {
            dataField: 'ls_name',
            text: 'LS Name'
        },
        {
            dataField: 'holidays',
            text: 'Holidays'
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
            dataField: 'owner_name',
            text: 'Owner Name'
        },
    ];
    
    return (
        <>
            <section className="laundry-panel">
                <div className="common-table">
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
                        keyField='ls_id'
                        data={laundries}
                        columns={columns}
                        wrapperClasses="table-responsive"
                    />
                </div>
            </section>
        </>
    )
}

export default Laundry;