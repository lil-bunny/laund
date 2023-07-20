import React, { useState } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import { DateRangePicker } from 'rsuite';
// import OnboardingModal from "../modal/OnboardingModal";
import CSAddRequestModal from "../modal/CSAddRequestModal";

const onboarding_requests = [
    {
        request_id: 'OD54781',
        request_by: "Hozefa",
        request_for: 'CS',
        name: 'L Manchu',
        request_date_and_time: '08 Dec. 2022 | 10:12 AM',
        enrollment_fee: 'Not Applicable',
        fee_status: 'Paid',
        admin_review: 'Done',
        onboarding_status: 'Approved',
    },
    {
        request_id: 'OD5498',
        request_by: "Hozefa",
        request_for: 'CS',
        name: 'L Manchu',
        request_date_and_time: '08 Dec. 2022 | 10:12 AM',
        enrollment_fee: 'Not Applicable',
        fee_status: 'Paid',
        admin_review: 'Done',
        onboarding_status: 'Approved',
    },
    {
        request_id: 'OD56219',
        request_by: "Hozefa",
        request_for: 'CS',
        name: 'L Manchu',
        request_date_and_time: '08 Dec. 2022 | 10:12 AM',
        enrollment_fee: 'Not Applicable',
        fee_status: 'Paid',
        admin_review: 'Done',
        onboarding_status: 'Approved',
    },
    {
        request_id: 'OD56211',
        request_by: "Hozefa",
        request_for: 'CS',
        name: 'L Manchu',
        request_date_and_time: '08 Dec. 2022 | 10:12 AM',
        enrollment_fee: 'Not Applicable',
        fee_status: 'Paid',
        admin_review: 'Done',
        onboarding_status: 'Approved',
    },
    {
        request_id: 'OD56212',
        request_by: "Hozefa",
        request_for: 'CS',
        name: 'L Manchu',
        request_date_and_time: '08 Dec. 2022 | 10:12 AM',
        enrollment_fee: 'Not Applicable',
        fee_status: 'Paid',
        admin_review: 'Done',
        onboarding_status: 'Approved',
    },
    {
        request_id: 'OD56213',
        request_by: "Hozefa",
        request_for: 'CS',
        name: 'L Manchu',
        request_date_and_time: '08 Dec. 2022 | 10:12 AM',
        enrollment_fee: 'Not Applicable',
        fee_status: 'Paid',
        admin_review: 'Done',
        onboarding_status: 'Approved',
    },
    {
        request_id: 'OD56214',
        request_by: "Hozefa",
        request_for: 'CS',
        name: 'L Manchu',
        request_date_and_time: '08 Dec. 2022 | 10:12 AM',
        enrollment_fee: 'Not Applicable',
        fee_status: 'Paid',
        admin_review: 'Done',
        onboarding_status: 'Approved',
    },
    {
        request_id: 'OD56215',
        request_by: "Hozefa",
        request_for: 'CS',
        name: 'L Manchu',
        request_date_and_time: '08 Dec. 2022 | 10:12 AM',
        enrollment_fee: 'Not Applicable',
        fee_status: 'Paid',
        admin_review: 'Done',
        onboarding_status: 'Approved',
    },
    {
        request_id: 'OD56216',
        request_by: "Hozefa",
        request_for: 'CS',
        name: 'L Manchu',
        request_date_and_time: '08 Dec. 2022 | 10:12 AM',
        enrollment_fee: 'Not Applicable',
        fee_status: 'Paid',
        admin_review: 'Done',
        onboarding_status: 'Approved',
    },
    {
        request_id: 'OD56208',
        request_by: "Hozefa",
        request_for: 'CS',
        name: 'L Manchu',
        request_date_and_time: '08 Dec. 2022 | 10:12 AM',
        enrollment_fee: 'Not Applicable',
        fee_status: 'Paid',
        admin_review: 'Done',
        onboarding_status: 'Approved',
    },
];

const Onboarding = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    
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
            dataField: 'request_id',
            text: 'Request ID',
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                  setShow(true);
                }
            }
        },
        {
            dataField: 'request_by',
            text: 'Request By'
        },
        {
            dataField: 'request_for',
            text: 'Request For'
        },
        {
            dataField: 'name',
            text: 'Name'
        },
        {
            dataField: 'request_date_and_time',
            text: 'Request Date and Time'
        },
        {
            dataField: 'enrollment_fee',
            text: 'Enrollment Fee'
        },
        {
            dataField: 'fee_status',
            text: 'Fee Status'
        },
        {
            dataField: 'admin_review',
            text: 'Admin Review'
        },
        {
            dataField: 'onboarding_status',
            text: 'Onboarding Status'
        },
    ];
    
    return (
        <>
            <section className="onboarding-panel">
                <h1>Onboarding</h1>
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
                        keyField='request_id'
                        data={onboarding_requests}
                        columns={columns}
                        wrapperClasses="table-responsive"
                    />
                </div>
            </section>
            {/* <OnboardingModal show={show} onHide={handleClose}  /> */}
            <CSAddRequestModal show={show} onHide={handleClose} />
        </>
    )
}

export default Onboarding;