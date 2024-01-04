import React, { useState, useEffect } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from "react-bootstrap-table2-paginator";
import { DateRangePicker } from "rsuite";
//import CSAddRequestModal from "../modal/CSAddRequestModal";
import OnboardingModal from "../modal/OnboardingModal";
import dateFormat from "dateformat";
import apiurl from "@component/api/apiconfig";
import { imagepath,per_page_item,NoDataText} from "@component/functions/commonfunction";
import axiosInstance from "@component/api/axiosinstance";
import swal from "sweetalert";
import Icon from "../icon";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
const Onboarding = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [onboardingdata, setOnboard] = useState([]);
    const [onboarding_requests, setData] = useState([]);
    const [total_items, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    let imageLocation = imagepath();
    let ItemNotFound=NoDataText();
    const [filterKey, setKeyFilter] = useState('');
    const[emptyDataMessage,SetNodataText]=useState('');

    const itemsPerPage = per_page_item();
    const [FilterDateRange, setRangeFilter] = useState(null);
    const [filterByType, setfilterByType] = useState('');
    let dateRange='';
    if(FilterDateRange!==null){

      dateRange='&date_range_start='+dateFormat(`${FilterDateRange[0]}`, "yyyy-mm-dd")+'&date_range_end='+dateFormat(`${FilterDateRange[1]}`, "yyyy-mm-dd");
     }
    // Function to perform the GET request
    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(apiurl + 'onboarding/onboarding-list?page=' + currentPage + '&limit=' + itemsPerPage+filterKey+dateRange+filterByType);
            setData(response.data); // Assuming the response contains the data you need
            setTotalItems(response.count);
            if(response.count==0){
                SetNodataText(ItemNotFound);
              }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData(); // Call the function to fetch the data

    }, [currentPage,filterKey,dateRange,filterByType]);

    const indexNum = (cell, row, index) => {
        return (<div>{index + 1}</div>)
    }
    const nameFormatter = (cell, row) => {
        return `${row.firstName} ${row.lastName}`
    }
    const enrollmentDate_formate = (cell, row) => {
        return dateFormat(`${row.enrollmentDate}`, "mmmm dS, yyyy");
    }

    const status_formator = (cell, row) => {
        if (row.status === 0) {
            return 'Deleted';
        }
        else if (row.status === 1) {
            return 'Active';
        }
        else if (row.status === 2) {
            return 'Accepted';
        }
        else if (row.status === 3) {
            return 'Rejected';
        }
        else if (row.status === 4) {
            return 'Blocked';
        }
        else {
            return 'Pending';
        }
    }


    //console.log(onboarding_requests);
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
                    setOnboard({ 'id': row.id, 'address': row.address, 'fullname': row.firstName + ' ' + row.lastName });
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
            dataField: 'primary_phone_no',
            text: 'Phone Number'
        },
        {
            dataField: 'pincode',
            text: 'Pincode'
        },
        {
            dataField: 'status',
            text: 'Onboarding Status',
            formatter: status_formator
        },
    ];



    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlekeySearch = (event) => {
        //set_Search_key(event.target.value);
        if(event.target.value!=''){
        setKeyFilter('&search_key='+event.target.value.trim());
        }
        else{
          setKeyFilter('');
        }
      };


      const handleTypeFilter = (event) => {
        if(event.target.value!=''){
            setfilterByType('&user_type='+event.target.value.trim());
        }
        else{
            setfilterByType('');
        }
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
            <section className="onboarding-panel">
                <h1>Onboarding Request</h1>
                <div className="common-table">
                    <div className="table-header">
                        <div className="table-search">
                        <form className="d-flex form-inline">
                            <input className="form-control" type="text" name="search_key" placeholder="Search" aria-label="Search"
                  onChange={handlekeySearch} />
                                <img src={imageLocation + 'search.png'} alt="sort-img" />
                            
                        
                        <div className="select-dropdown table-select">
                            <img src={imageLocation + 'sort-down-small.png'} alt="sort-img" />
                            <select className="select" name="type" onChange={handleTypeFilter}>
                                <option value="">By Type</option>
                                <option value="delivery_boy">Delivery Boy</option>
                                <option value="customer">Customer</option>
                                <option value="helper">Helper</option>
                                <option value="laundry">Laundry Services</option>
                            </select>
                        </div>
                        <div className="select-dropdown table-select">
                            <DateRangePicker
                                format="dd/MM/yyyy"
                                onChange={setRangeFilter} 
                            />
                        </div>
                        </form>
                        </div>
                    </div>
                    <BootstrapTable
                        keyField='id'
                        data={onboarding_requests}
                        columns={columns}
                        noDataIndication={emptyDataMessage} 
                        wrapperClasses="table-responsive"
                    />

                    

                        {PaginationHtml()}
                      
                       
                </div>
            </section>
            <OnboardingModal show={show} onHide={handleClose} onboardingdata={onboardingdata} />
        </>
    )
}

export default Onboarding;