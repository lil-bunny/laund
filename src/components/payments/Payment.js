import React, { useState, useEffect } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from "react-bootstrap-table2-paginator";
import { DateRangePicker } from 'rsuite';
import dateFormat from "dateformat";
import apiurl from "@component/api/apiconfig";
import { imagepath, per_page_item, NoDataText } from "@component/functions/commonfunction";
import axiosInstance from "@component/api/axiosinstance";
import swal from "sweetalert";
import Icon from "../icon";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Payment = () => {

    let imageLocation = imagepath();
    let ItemNotFound = NoDataText();
    const [paymentdada, setData] = useState([]);
    const [total_items, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = per_page_item();
    const [filterKey, setKeyFilter] = useState('');
    const [filterStatus, setStatusfilter] = useState('');
    const [filterTYTo, setfilterTYTO] = useState('');
    const [FilterDateRange, setRangeFilter] = useState(null);

    let dateRange='';
     
    const [emptyDataMessage, SetNodataText] = useState('');

    if(FilterDateRange!==null){

      dateRange='&date_range_start='+dateFormat(`${FilterDateRange[0]}`, "yyyy-mm-dd")+'&date_range_end='+dateFormat(`${FilterDateRange[1]}`, "yyyy-mm-dd");
     }
  
    //console.log(FilterDateRange);

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(apiurl + 'payment/payment-list?page=' + currentPage + '&limit=' + itemsPerPage + filterKey + filterStatus+filterTYTo+dateRange);
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
    }, [currentPage, filterKey, filterStatus,filterTYTo+dateRange]);

    const transaction_date_formate = (cell, row) => {
        if (row.createdAt != null || typeof row.createdAt !== 'undefined') {
          return dateFormat(`${row.createdAt}`, "mmmm dS, yyyy h:MM:ss TT ");
        }
        else {
          return '-';
        }
      }


      const payment_status_formate = (cell, row) => {
        if (row.status != null || typeof row.status !== 'undefined') {
            if(row.status===1){
                return (<span className="payment-setteled">Setteled</span>);
            }
            else{
                return (<span className="payment-pending">Paid</span>);
            }
          
        }
        else {
          return '-';
        }
      }

      const orderAmountFormate = (cell, row) => {
        return (<span className="order-total-amount">{row.amount.toFixed(2)}</span>)
      }
      
    
    const columns = [
        {
            dataField: 'transaction_id',
            text: 'Transaction ID'
        },
        {
            dataField: 'transaction_date',
            text: 'Transaction Date',
            formatter: transaction_date_formate,
        },
        {
            dataField: 'amount',
            text: 'Amount',
            formatter: orderAmountFormate,
        },
        {
            dataField: 'amount_paid_by',
            text: 'Payment From'
        },
        {
            dataField: 'amount_received_by',
            text: 'Payment To'
        },
        {
            dataField: 'payment_mode',
            text: 'Payment Mode'
        },
        {
            dataField: 'status',
            text: 'Payment Status',
            formatter: payment_status_formate,
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
    
      const handlekeySearch_staus = (event) => {
        if(event.target.value!=''){
          setStatusfilter('&status='+event.target.value.trim());
        }
        else{
          setStatusfilter('');
        }
      };

      const handleDayFilter = (event) => {
        if(event.target.value!=''){
            setfilterTYTO('&day='+event.target.value.trim());
        }
        else{
            setfilterTYTO('');
        }
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

      //console.log(FilterDateRange);
    return (
        <>
            <section className="payment-panel">
                <div className="common-table">
                    <div className="table-header">
                        

                        <div className="table-search">
              <form className="d-flex form-inline">
                <div className="search_key">
                <input className="form-control" type="text" name="search_key" placeholder="Search" aria-label="Search"
                  onChange={handlekeySearch} />
                <img src="./assets/images/search.png" alt="sort-img" />
                </div>
                <div className="select-dropdown table-select">
                            <DateRangePicker
                                format="dd/MM/yyyy"
                                onChange={setRangeFilter} 
                            
                            />
                        </div>
                        <div className="select-dropdown table-select" onChange={handleDayFilter} > 
                            <img src="./assets/images/sort-down-small.png" alt="sort-img" />
                            <select className="select">
                            <option value="">Filter By Day</option>
                                <option value="today">Todays</option>
                                <option value="yesterday">Yesterday</option>
                                <option value="tomorrow">Tomorrow</option>
                            </select>
                        </div>

                <div className="select-dropdown table-select">
                <img src="./assets/images/sort-down-small.png" alt="sort-img" />
                <select className="select" name="status" onChange={handlekeySearch_staus}> 
                  <option value="">Status</option>
                  <option value="1">Paid</option>
                  <option value="2">Pending</option>
                </select>
              </div>
                </form>
              </div>
                    </div>
                    <BootstrapTable
                        keyField='transaction_id'
                        data={paymentdada}
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

export default Payment;