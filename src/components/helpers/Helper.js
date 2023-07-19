import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';

const deliveryBoys = [
    {
        helper_id: 'OD54710',
        helper_name: "L Menchu",
        dob: '17th Jan 1989',
        contact: '9046216598',
        enrollment_status: 'Active',
        enrollment_end_date: '01 Feb 2022',
        enrollment_fee: 'Rs. 300.00',
        db_name: 'Hozefa', 
    },
    {
        helper_id: 'OD54711',
        helper_name: "L Menchu",
        dob: '17th Jan 1989',
        contact: '9046216598',
        enrollment_status: 'Active',
        enrollment_end_date: '01 Feb 2022',
        enrollment_fee: 'Rs. 300.00',
        db_name: 'Hozefa', 
    },
    {
        helper_id: 'OD54712',
        helper_name: "L Menchu",
        dob: '17th Jan 1989',
        contact: '9046216598',
        enrollment_status: 'Active',
        enrollment_end_date: '01 Feb 2022',
        enrollment_fee: 'Rs. 300.00',
        db_name: 'Hozefa', 
    },
    {
        helper_id: 'OD54713',
        helper_name: "L Menchu",
        dob: '17th Jan 1989',
        contact: '9046216598',
        enrollment_status: 'Active',
        enrollment_end_date: '01 Feb 2022',
        enrollment_fee: 'Rs. 300.00',
        db_name: 'Hozefa', 
    },
    {
        helper_id: 'OD54714',
        helper_name: "L Menchu",
        dob: '17th Jan 1989',
        contact: '9046216598',
        enrollment_status: 'Active',
        enrollment_end_date: '01 Feb 2022',
        enrollment_fee: 'Rs. 300.00',
        db_name: 'Hozefa', 
    },
    {
        helper_id: 'OD54715',
        helper_name: "L Menchu",
        dob: '17th Jan 1989',
        contact: '9046216598',
        enrollment_status: 'Active',
        enrollment_end_date: '01 Feb 2022',
        enrollment_fee: 'Rs. 300.00',
        db_name: 'Hozefa', 
    },
    {
        helper_id: 'OD54716',
        helper_name: "L Menchu",
        dob: '17th Jan 1989',
        contact: '9046216598',
        enrollment_status: 'Active',
        enrollment_end_date: '01 Feb 2022',
        enrollment_fee: 'Rs. 300.00',
        db_name: 'Hozefa', 
    },
    {
        helper_id: 'OD54717',
        helper_name: "L Menchu",
        dob: '17th Jan 1989',
        contact: '9046216598',
        enrollment_status: 'Active',
        enrollment_end_date: '01 Feb 2022',
        enrollment_fee: 'Rs. 300.00',
        db_name: 'Hozefa', 
    },
    {
        helper_id: 'OD54718',
        helper_name: "L Menchu",
        dob: '17th Jan 1989',
        contact: '9046216598',
        enrollment_status: 'Active',
        enrollment_end_date: '01 Feb 2022',
        enrollment_fee: 'Rs. 300.00',
        db_name: 'Hozefa', 
    },
    {
        helper_id: 'OD54719',
        helper_name: "L Menchu",
        dob: '17th Jan 1989',
        contact: '9046216598',
        enrollment_status: 'Active',
        enrollment_end_date: '01 Feb 2022',
        enrollment_fee: 'Rs. 300.00',
        db_name: 'Hozefa', 
    },
];

const Helper = () => {
    const columns = [
        {
            dataField: 'helper_id',
            text: 'Helper ID'
        },
        {
            dataField: 'helper_name',
            text: 'Helper Name'
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
            dataField: 'db_name',
            text: 'DB Name'
        },
    ];
    
    return (
        <>
            <section className="helper-panel">
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
                        keyField='helper_id'
                        data={deliveryBoys}
                        columns={columns}
                        wrapperClasses="table-responsive"
                    />
                </div>
            </section>
        </>
    )
}

export default Helper;