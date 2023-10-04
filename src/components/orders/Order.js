import React, { useState, useEffect } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import { DateRangePicker } from 'rsuite';
import { imagepath, per_page_item } from "@component/functions/commonfunction";
import apiurl from "@component/api/apiconfig";
import dateFormat from "dateformat";
import axiosInstance from "@component/api/axiosinstance";
import Icon from "../icon";

const Order = () => {
    let imageLocation = imagepath();
    const [orderData, setData] = useState([]);
    const [total_items, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const itemsPerPage = per_page_item();

     // Function to perform the GET request
     const fetchData = async () => {
        try {
          const response = await axiosInstance.get(apiurl + 'order/order-list?page=' + currentPage + '&limit=' + itemsPerPage);
          setData(response.data); // Assuming the response contains the data you need
          setTotalItems(response.count);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      useEffect(() => {
      fetchData(); // Call the function to fetch the data
    }, [currentPage]);

    
    const indexNum = (cell, row, index) => {
        return (<div>{index + 1}</div>);
    }

    const csNameFormator = (cell, row) => {
        return `${row.customer.firstName} ${row.customer.lastName}`;
       }

       const dbNameFormator = (cell, row) => {
        return `${row.delivery_boy.firstName} ${row.delivery_boy.lastName}`;
       }

       const hsNameFormator = (cell, row) => {
        if(row.helper!=null){
            return `${row.delivery_boy.firstName} ${row.delivery_boy.lastName}`;
        }
        else{
            return '-';
        }
       
       }

       const pickup_requestFormator = (cell, row) => {
        if(row.pickup_request_date!=null && row.pickup_request_time!=null){
            return dateFormat(`${row.pickup_request_date}`, "d mmm yyyy")+'|'+row.pickup_request_time;
          }
          else{
            return '';
          }
       }

    const columns = [
        {
            dataField: 'SL No',
            text: '',
            formatter: indexNum
        },
        {
            dataField: 'order_unique_id',
            text: 'Order ID'
        },
        {
            dataField: 'cs_name',
            text: 'CS Name',
            formatter: csNameFormator
        },
        {
            dataField: 'db_name',
            text: 'DB Name',
            formatter: dbNameFormator
        },
        {
            dataField: 'helper_name',
            text: 'Helper Name',
            formatter: hsNameFormator
        },
        {
            dataField: 'pickup_request',
            text: 'Pickup Request',
            formatter: pickup_requestFormator
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

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    
    
    const handleSearch = (event) => {
        // console.log(event.target.value);
        setSearchText(event.target.value);
    };
    
    const filteredData = orderData.filter((item) =>
        Object.values(item).some((field) =>
            String(field).toLowerCase().includes(searchText.toLowerCase())
        )
    );
    const renderItems = () => {
        return Array.from({ length: Math.ceil(total_items / itemsPerPage) }, (_, index) => (
            <button key={index} onClick={() => handlePageChange(index + 1)} className={currentPage === index + 1 ? "active" : ""}>{index + 1}</button>
        ));
    };
    
    const PaginationHtml = () => {
        if(Math.ceil(total_items / itemsPerPage)>1){
        return<div className="custom-pagination"> 
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        <Icon icon="fa-arrow-left"/>
        </button>
        {renderItems()}
        <button onClick={() => handlePageChange(currentPage + 1)}disabled={currentPage === Math.ceil(total_items / itemsPerPage)}><Icon icon="fa-arrow-right"/>
        </button>
       </div>
        }
    };

    return (
        <>
            <section className="order-panel">
                <h1>Order</h1>
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
                        keyField='id'
                        data={filteredData}
                        columns={columns}
                        wrapperClasses="table-responsive"
                    />
                    {PaginationHtml()}
                </div>
            </section>
        </>
    )
}

export default Order;