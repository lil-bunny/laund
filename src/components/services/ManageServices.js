import React, { useState,useEffect } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const serviceslist = [
    {
        id: '1',
        name: "Wash + Fold",
        subservices: 'Men',
        number_of_items: '4',
    },
    {
        id: '2',
        name: "Wash + Iron",
        subservices: 'Women',
        number_of_items: '4',
    },
    {
        id: '3',
        name: "Steam Iron",
        subservices: 'Sunil K',
        number_of_items: '4',
    },
    {
        id: '4',
        name: "Dry Clean",
        subservices: 'Men,Women',
        number_of_items: '4',
    },
];

const ManageServices = () =>{
    const columns = [
        {
            dataField: 'id',
            text: 'Service Id'
        },
        {
            dataField: 'name',
            text: 'Name'
        },
        {
            dataField: 'subservices',
            text: 'Sub Services'
        },
        {
            dataField: 'number_of_items',
            text: 'Number Of Items'
        },
    ];

    return(
        <>
            <section className="delivery-boy-panel">
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
                        keyField='id'
                        data={serviceslist}
                        columns={columns}
                        wrapperClasses="table-responsive"
                    />
                </div>
            </section>
            
        </>
    )
}

export default ManageServices;