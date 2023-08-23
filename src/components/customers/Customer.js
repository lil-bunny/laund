import React, { useState,useEffect } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from "react-bootstrap-table2-paginator";
import apiurl from "@component/api/apiconfig";
import { imagepath } from "@component/functions/commonfunction";
import axiosInstance from "@component/api/axiosinstance";
import { getStaticProps, getStaticPaths } from 'next';
import Icon from "../icon";
import swal from "sweetalert";

const Customer = () => {
    let imageLocation=imagepath();

    const [customers, setData] = useState([]);
    const DeleteCust = (id) =>{
        let data = { 'id':''+id+'',
                      'type':'0'
                    };
        axiosInstance.delete(apiurl+'delete-customer', {data})
                .then((response) => {
                   // console.log(response);
                    if (response.status === 1) {
                      swal("success", "Customer deleted successfully", "success");
    
                    }
                    else if(response.status === 2){
                        swal("Error", 'Error in data deletion', "error");
                    }
                })
                .catch((error) => {
                    //console.log('Error', error);
                    swal("Error", 'Error in data deletion', "error");
            });
        }
    useEffect(() => {
        // Function to perform the GET request
        const fetchData = async () => {
          try {
            const response = await axiosInstance.get(apiurl+'customer-list');
            setData(response.data); // Assuming the response contains the data you need
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData(); // Call the function to fetch the data
      }, []);
        const indexNum = (cell, row, index) => {
            return (<div>{index + 1}</div>)
        }
        const nameFormatter = (cell, row) => {
            return `${row.firstName} ${row.lastName}`
           }
        const actionFormator = (cell, row) => {
            return   (<div><a href={'customer-details/'+row.id}><Icon icon="fa-eye" size="1x" color="#3A67BB" /></a> <span className="trash-item" onClick={() => DeleteCust(row.id)}><Icon icon="fa-trash" size="1x" color="#3A67BB" /></span></div>); 
          }
    const columns = [
        {
            dataField: 'SL No',
            text: 'S.N',
            formatter: indexNum
        },
       
        {
            dataField: 'cs_name',
            text: 'CS Name',
            formatter: nameFormatter
        },
        {
            dataField: 'primary_phone_no',
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
                                <input className="form-control" type="text" placeholder="Search" aria-label="Search"  value={searchText}
          onChange={handleSearch}/>
                                <img src="../assets/images/search.png" alt="sort-img" />
                            </form>
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

export default Customer;