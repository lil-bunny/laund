import React, { useState } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from "react-bootstrap-table2-paginator";
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
        cs_name: "L test",
        contact: '9046216598',
        last_order: '01 Feb 2022',
        unpaid_amount: 256.0,
        active_orders: '00',
        address: 'Flat No 301, A Wing, Blosom Society, Ujwal Co...',
    },
    {
        cs_id: 'OD54751',
        cs_name: "L test",
        contact: '9046216598',
        last_order: '01 Feb 2022',
        unpaid_amount: 256.0,
        active_orders: '00',
        address: 'Flat No 301, A Wing, Blosom Society, Ujwal Co...',
    },
];

const Customernew = () => {
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
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    // Define pagination options
    const paginationOptions = {
        sizePerPage: 5,
        hideSizePerPage: true,
        hidePageListOnlyOnePage: true,
        onPageChange: (page, sizePerPage) => setCurrentPage(page),
      };
      // Function to handle search input change
    const handleSearch = (event) => {
        console.log(event.target.value);
        setSearchText(event.target.value);
      };
    
      // Filter the data based on the search text
      const filteredData = customers.filter((item) =>
        Object.values(item).some((field) =>
          String(field).toLowerCase().includes(searchText.toLowerCase())
        )
      );
    return (
        <>
            <section className="customer-panel">
                <div className="common-table">
                    <div className="table-header">
                        <div className="table-search">
                            <form className="form-inline">
                                
                                <input className="form-control" type="text" placeholder="Search" aria-label="Search" value={searchText}
          onChange={handleSearch} />
                                <img src="./assets/images/search.png" alt="sort-img" />
                            </form>
                        </div>
                    </div>
                    <BootstrapTable
                        keyField='cs_id'
                        data={filteredData}
                        columns={columns}
                        pagination={paginationFactory(paginationOptions)}
                        wrapperClasses="table-responsive"
                    />
                </div>
            </section>
        </>
    )
}

export default Customernew;