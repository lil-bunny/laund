import React, { useState,useEffect } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from "react-bootstrap-table2-paginator";
import apiurl from "@component/api/apiconfig";
import axiosInstance from "@component/api/axiosinstance";
import { imagepath ,per_page_item} from "@component/functions/commonfunction";
import swal from "sweetalert";
import Icon from "../icon";

const Helper = () => {
    const [helpers, setData] = useState([]);
    const [total_items, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const itemsPerPage = per_page_item();
    let imageLocation=imagepath();
    
        // Function to perform the GET request
        const fetchData = async () => {
          try {
            const response = await axiosInstance.get(apiurl + 'helper/helper-list?page=' + currentPage + '&limit=' + itemsPerPage);
            setData(response.data); // Assuming the response contains the data you need
            setTotalItems(response.count);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    useEffect(() => {
        fetchData(); // Call the function to fetch the data
      }, [currentPage]);

      console.log(total_items);
    const indexNum = (cell, row, index) => {
        return (<div>{index+1}</div>) 
    }
    const nameFormatter = (cell, row) => {
        return `${row.firstName} ${row.lastName}`
       }


       const actionFormator = (cell, row) => {
        return   (<div><a href={'helper-details/'+row.id}><Icon icon="fa-eye" size="1x" color="#3A67BB" /></a></div>); 
      }
    const columns = [
        {
            dataField: 'SL No',
            text: '',
            formatter: indexNum
        },
        {
            dataField: 'helper_name',
            text: 'Helper Name',
            formatter: nameFormatter
        },
        {
            dataField: 'dob',
            text: 'DOB'
        },
        {
            dataField: 'primary_phone_no',
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
        {
            dataField: 'action',
            text: 'Action',
            formatter: actionFormator
        },
    ];
    

   
    
    
    const handleSearch = (event) => {
        // console.log(event.target.value);
        setSearchText(event.target.value);
    };
    
    const filteredData = helpers.filter((item) =>
        Object.values(item).some((field) =>
            String(field).toLowerCase().includes(searchText.toLowerCase())
        )
    );

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
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
            <section className="helper-panel">
                <div className="common-table">
                    <div className="table-header">
                        <div className="table-search">
                            <form className="form-inline">
                                <input className="form-control" type="search" placeholder="Search" aria-label="Search"  value={searchText}
          onChange={handleSearch} />
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

export default Helper;