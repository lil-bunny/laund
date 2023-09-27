import React, { useState,useEffect } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from "react-bootstrap-table2-paginator";
import AddModal from "../modal/AddModal";
import dateFormat from "dateformat";
import apiurl from "@component/api/apiconfig";
import { imagepath,per_page_item } from "@component/functions/commonfunction";
import axiosInstance from "@component/api/axiosinstance";
import swal from "sweetalert";
import Icon from "../icon";
import Link from 'next/link';
import { useRouter } from 'next/navigation';


const DeliveryBoy = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  let imageLocation=imagepath();
  const [deliveryBoys, setData] = useState([]);
  const [total_items, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const itemsPerPage = per_page_item();

  
    // Function to perform the GET request
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(apiurl + 'delivery-boy/laundry-associate-list?page=' + currentPage + '&limit=' + itemsPerPage);
        setData(response.data); // Assuming the response contains the data you need
        setTotalItems(response.count);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    useEffect(() => {
    fetchData(); // Call the function to fetch the data
  }, [currentPage]);
  const DeleteDboy = (id) =>{
    let data = { 'id':''+id+''};
    axiosInstance.delete(apiurl+'delivery-boy/delete-laundry-associate', {data})
            .then((response) => {
                if (response.status === 1) {
                  swal("success", "Delivery Boy deleted successfully", "success");
                  fetchData();

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
  

  
console.log(deliveryBoys);
  const indexNum = (cell, row, index) => {
    return (<div>{index+1}</div>) 
}

const actionFormator = (cell, row) => {
  return   (<div><a className="update-db" href={'update-delivery-boy/'+row.id}><Icon icon="fa-pencil" size="1x" color="#3A67BB" /></a><a href={'delivery-boy-details/'+row.id}><Icon icon="fa-eye" size="1x" color="#3A67BB" /></a> <span className="trash-item" onClick={() => DeleteDboy(row.id)}><Icon icon="fa-trash" size="1x" color="#3A67BB" /></span></div>); 
}

const idFormator = (cell, row) => {
    return (<span className="d-boy">{row.id}</span>) ; 
  }

const nameFormatter = (cell, row) => {
 return `${row.firstName} ${row.lastName}`
}

const dob_formate = (cell, row) => {
  if(row.dob!=null){
    return dateFormat(`${row.dob}`, "mmmm dS, yyyy");
  }
  else{
    return '';
  }
   }
   const status_formator = (cell, row) => {
    if(row.status===0){
        return 'Deleted';
    }
    else if(row.status===1){
        return 'In Active';
    }
    else if(row.status===2){
      return 'Active';
  }
    else{
        return 'Active';
    }
   }

  const columns = [
    {
      dataField: 'id',
      text: 'S. N',
      formatter: indexNum,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          setShow(true);
        }
      }
    },
    {
      dataField: 'db_name',
      text: 'Full Name',
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
  


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
};


const handleSearch = (event) => {
    // console.log(event.target.value);
    setSearchText(event.target.value);
};

const filteredData = deliveryBoys.filter((item) =>
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
      <section className="delivery-boy-panel">
        <div className="common-table order-panel-table">
          <div className="table-header">
            <div className="add-new-dboy">
              <a href="/new-delivery-boy">Add New</a>
            </div>
            <div className="table-search">
              <form className="form-inline">
                <input className="form-control" type="search" placeholder="Search" aria-label="Search" value={searchText}
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
      <AddModal show={show} onHide={handleClose} />
    </>
  )
}

export default DeliveryBoy;