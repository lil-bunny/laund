import React, { useState,useEffect } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from "react-bootstrap-table2-paginator";
import { DateRangePicker } from "rsuite";
//import CSAddRequestModal from "../modal/CSAddRequestModal";
import OnboardingModal from "../modal/OnboardingModal";
import dateFormat from "dateformat";
import apiurl from "@component/api/apiconfig";
import { imagepath } from "@component/functions/commonfunction";
import axiosInstance from "@component/api/axiosinstance";
import swal from "sweetalert";
import Icon from "../icon";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Onboarding = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [onboardingdata, setOnboarrd] = useState([]);
  const [onboarding_requests, setData] = useState([]);
  let imageLocation=imagepath();


  useEffect(() => {
    // Function to perform the GET request
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(apiurl+'onboarding-list');
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
   const enrollmentDate_formate = (cell, row) => {
    return dateFormat(`${row.enrollmentDate}`, "mmmm dS, yyyy");
   }

   const status_formator = (cell, row) => {
    if(row.status===0){
        return 'Deleted';
    }
    else if(row.status===1){
        return 'Active';
    }
    else if(row.status===2){
        return 'Accepted';
    }
    else if(row.status===3){
        return 'Rejected';
    }
    else if(row.status===4){
        return 'Blocked';
    }
    else{
        return 'Pending';
    }
   }


   console.log(onboarding_requests);
  const columns = [
      {
          dataField: 'SL No',
          text: '',
          formatter: indexNum
      },
      {
          dataField: 'id',
          text: 'Request ID',
          events: {
              onClick: (e, column, columnIndex, row, rowIndex) => {
                setShow(true);
                setOnboarrd(row.id);
              }
          }
      },
      {
          dataField: 'addedByName',
          text: 'Request By'
      },
      {
          dataField: 'roleName',
          text: 'Request For'
      },
      {
          dataField: 'name',
          text: 'Name',
          formatter: nameFormatter  
      },
      {
          dataField: 'enrollmentDate',
          text: 'Request Date and Time',
          formatter: enrollmentDate_formate  
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
          dataField: 'status',
          text: 'Onboarding Status',
          formatter: status_formator
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

   const filteredData = onboarding_requests.filter((item) =>
   Object.values(item).some((field) =>
     String(field).toLowerCase().includes(searchText.toLowerCase())
   )
 );
  return (
      <>
          <section className="onboarding-panel">
              <h1>Onboarding</h1>
              <div className="common-table">
                  <div className="table-header">
                      <div className="table-search">
                          <form className="form-inline">
                              <input className="form-control" type="search" placeholder="Search" aria-label="Search" value={searchText}
          onChange={handleSearch} />
                              <img src={imageLocation+'search.png'} alt="sort-img" />
                          </form>
                      </div>
                      <div className="select-dropdown table-select">
                          <img src={imageLocation+'sort-down-small.png'} alt="sort-img" />
                          <select className="select">
                              <option value="">By Type</option>
                              <option value="1">Type 1</option>
                              <option value="2">Type 2</option>
                              <option value="3">Type 3</option>
                          </select>
                      </div>
                      <div className="select-dropdown table-select">
                          <img src={imageLocation+'sort-down-small.png'} alt="sort-img" />
                          <select className="select">
                              <option value="">Select DB</option>
                              <option value="1">DB 1</option>
                              <option value="2">DB 2</option>
                              <option value="3">DB 3</option>
                          </select>
                      </div>
                      <div className="select-dropdown table-select">
                          <img src={imageLocation+'sort-down-small.png'} alt="sort-img" />
                          <select className="select">
                              <option value="">Select Helper</option>
                              <option value="1">Helper 1</option>
                              <option value="2">Helper 2</option>
                              <option value="3">helper 3</option>
                          </select>
                      </div>
                      <div className="select-dropdown table-select">
                          <img src={imageLocation+'sort-down-small.png'} alt="sort-img" />
                          <select className="select">
                              <option value="">Delivery Status</option>
                              <option value="1">Status 1</option>
                              <option value="2">Status 2</option>
                              <option value="3">Status 3</option>
                          </select>
                      </div>
                      <div className="select-dropdown table-select">
                          <img src={imageLocation+'sort-down-small.png'} alt="sort-img" />
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
                      pagination={paginationFactory(paginationOptions)}
                  />
              </div>
          </section>
          {/* <OnboardingModal show={show} onHide={handleClose}  /> */}
          <OnboardingModal show={show} onHide={handleClose}  onboardingdata={onboardingdata}/>
      </>
  )
}

export default Onboarding;