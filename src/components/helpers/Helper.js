import React, { useState,useEffect } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from "react-bootstrap-table2-paginator";
import apiurl from "@component/pages/api/apiconfig";
import axiosInstance from "@component/api/axiosinstance";
import { imagepath } from "@component/functions/commonfunction";
import swal from "sweetalert";
import Icon from "../icon";

const Helper = () => {
    const [helpers, setData] = useState([]);
    let imageLocation=imagepath();
    useEffect(() => {
        // Function to perform the GET request
        const fetchData = async () => {
          try {
            const response = await axiosInstance.get(apiurl+'helper-list');
            setData(response.data); // Assuming the response contains the data you need
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData(); // Call the function to fetch the data
      }, []);
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
    
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState("");
  
  
    const paginationOptions = {
      sizePerPage: 10,
      hideSizePerPage: true,
      hidePageListOnlyOnePage: true,
      onPageChange: (page, sizePerPage) => setCurrentPage(page),
    };
  
    const handleSearch = (event) => {
      // console.log(event.target.value);
       setSearchText(event.target.value);
     };
  
     const filteredData = helpers.filter((item) =>
     Object.values(item).some((field) =>
       String(field).toLowerCase().includes(searchText.toLowerCase())
     )
   );
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
                        pagination={paginationFactory(paginationOptions)}
                        wrapperClasses="table-responsive"
                    />
                </div>
            </section>
        </>
    )
}

export default Helper;