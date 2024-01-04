import React, { useState, useEffect } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from "react-bootstrap-table2-paginator";
import dateFormat from "dateformat";
import apiurl from "@component/api/apiconfig";
import { imagepath, per_page_item, NoDataText } from "@component/functions/commonfunction";
import axiosInstance from "@component/api/axiosinstance";
import swal from "sweetalert";
import Icon from "../icon";
import Link from 'next/link';
import { useRouter } from 'next/navigation';


const Laundry = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  let imageLocation = imagepath();
  const [laundryList, setData] = useState([]);
  const [total_items, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const itemsPerPage = per_page_item();
  let ItemNotFound = NoDataText();
  const [filterKey, setKeyFilter] = useState('');
  const [filterStatus, setStatusfilter] = useState('');
  const [emptyDataMessage, SetNodataText] = useState('');



  // Function to perform the GET request
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(apiurl + 'laundry-service/laundry-list?page=' + currentPage + '&limit=' + itemsPerPage + filterKey + filterStatus);
      setData(response.data); // Assuming the response contains the data you need
      setTotalItems(response.count);
      if (response.count == 0) {
        SetNodataText(ItemNotFound);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData(); // Call the function to fetch the data
  }, [currentPage, filterKey, filterStatus]);

  const indexNum = (cell, row, index) => {
    return (<div>{index + 1}</div>)
  }

  const actionFormator = (cell, row) => {
    return (<div><a href={'laundry-details/' + row.id}><Icon icon="fa-eye" size="1x" color="#3A67BB" /></a> </div>);
  }

  const idFormator = (cell, row) => {
    return (<span className="d-boy">{row.id}</span>);
  }

  const nameFormatter = (cell, row) => {
    return `${row.laundry_name}`
  }

  const dob_formate = (cell, row) => {
    if (row.dob != null) {
      return dateFormat(`${row.dob}`, "dd mmm, yyyy");
    }
    else {
      return '';
    }
  }
  const status_formator = (cell, row) => {
    if (row.status === 0) {
      return 'Deleted';
    }
    else if (row.status === 1) {
      return 'In Active';
    }
    else if (row.status === 2) {
      return 'Active';
    }
    else {
      return 'Active';
    }
  }

  const columns = [
    {
      dataField: 'id',
      text: 'S. N',
      formatter: indexNum,
    },
    {
      dataField: 'laundry_name',
      text: 'Laundry Name',
      formatter: nameFormatter,
    },
    {
      dataField: 'dob',
      text: 'DOB',
      formatter: dob_formate,
    },
    {
      dataField: 'primary_phone_no',
      text: 'Contact'
    },
    {
      dataField: 'address',
      text: 'Address'
    },
    {
      dataField: 'cityName',
      text: 'City',
    },


    {
      dataField: 'pincode',
      text: 'Pincode'
    },

    {
      dataField: 'status',
      text: 'Status',
      formatter: status_formator,
    },
    {
      dataField: 'action',
      text: 'Action',
      formatter: actionFormator
    },
  ];
  const handlekeySearch = (event) => {
    //set_Search_key(event.target.value);
    if (event.target.value != '') {
      setKeyFilter('&search_key=' + event.target.value.trim());
    }
    else {
      setKeyFilter('');
    }
  };

  const handlekeySearch_staus = (event) => {
    if (event.target.value != '') {
      setStatusfilter('&status=' + event.target.value.trim());
    }
    else {
      setStatusfilter('');
    }
  };


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const renderItems = () => {
    return Array.from({ length: Math.ceil(total_items / itemsPerPage) }, (_, index) => (
      <button key={index} onClick={() => handlePageChange(index + 1)} className={currentPage === index + 1 ? "active" : ""}>{index + 1}</button>
    ));
  };

  const PaginationHtml = () => {
    if (Math.ceil(total_items / itemsPerPage) > 1) {
      return <div className="custom-pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          <Icon icon="fa-arrow-left" />
        </button>
        {renderItems()}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(total_items / itemsPerPage)}><Icon icon="fa-arrow-right" />
        </button>
      </div>
    }
  };
  
  console.log(laundryList);
  return (
    <>
      <section className="delivery-boy-panel db-details-panel">
        <h1>Laundry Service</h1>
        <div className="common-table order-panel-table">
          <div className="table-header">
            <div className="table-search">
              <form className="d-flex form-inline">
                <div className="search_key">
                  <input className="form-control" type="text" name="search_key" placeholder="Search" aria-label="Search"
                    onChange={handlekeySearch} />
                  <img src="./assets/images/search.png" alt="sort-img" />
                </div>
                <div className="select-dropdown table-select">
                  <img src="./assets/images/sort-down-small.png" alt="sort-img" />
                  <select className="select" name="status" onChange={handlekeySearch_staus}>
                    <option value="">Status</option>
                    <option value="1">Active</option>
                    <option value="2">Accepted</option>
                    <option value="3">Rejected</option>
                    <option value="4">Deleted</option>
                  </select>
                </div>
              </form>
            </div>
          </div>
          <BootstrapTable
            keyField='id'
            data={laundryList}
            columns={columns}
            noDataIndication={emptyDataMessage}
            wrapperClasses="table-responsive"
          />

          {PaginationHtml()}
        </div>
      </section>
    </>
  )
}

export default Laundry;