import React, { useState, useEffect } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from "react-bootstrap-table2-paginator";
import apiurl from "@component/api/apiconfig";
import { imagepath, per_page_item ,NoDataText} from "@component/functions/commonfunction";
import axiosInstance from "@component/api/axiosinstance";
import { getStaticProps, getStaticPaths } from 'next';
import Icon from "../icon";
import swal from "sweetalert";

const Customer = () => {
    let imageLocation = imagepath();

    const [customers, setData] = useState([]);
    const [total_items, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const itemsPerPage = per_page_item();
    let ItemNotFound = NoDataText();
    const [filterKey, setKeyFilter] = useState('');
    const [emptyDataMessage, SetNodataText] = useState('');

    const DeleteCust = (id) => {
        let data = {
            'id': '' + id + '',
            'type': '0'
        };
        axiosInstance.delete(apiurl + 'customer/delete-customer', { data })
            .then((response) => {
                // console.log(response);
                if (response.status === 1) {
                    swal("success", "Customer deleted successfully", "success");

                }
                else if (response.status === 2) {
                    swal("Error", 'Error in data deletion', "error");
                }
            })
            .catch((error) => {
                //console.log('Error', error);
                swal("Error", 'Error in data deletion', "error");
            });
    }

    // Function to perform the GET request
    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(apiurl + 'customer/customer-list?page=' + currentPage + '&limit=' + itemsPerPage+filterKey);
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
    }, [currentPage,filterKey]);
    const indexNum = (cell, row, index) => {
        return (<div>{index + 1}</div>)
    }
    const nameFormatter = (cell, row) => {
        return `${row.firstName} ${row.lastName}`
    }
    const actionFormator = (cell, row) => {
        return (<div><a href={'customer-details/' + row.id}><Icon icon="fa-eye" size="1x" color="#3A67BB" /></a> <span className="trash-item" onClick={() => DeleteCust(row.id)}><Icon icon="fa-trash" size="1x" color="#3A67BB" /></span></div>);
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
    const handlekeySearch = (event) => {
        //set_Search_key(event.target.value);
        if (event.target.value != '') {
          setKeyFilter('&search_key=' + event.target.value.trim());
        }
        else {
          setKeyFilter('');
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
    return (
        <>
            <section className="customer-panel">
                <div className="common-table">
                    <div className="table-header">
                        <div className="table-search">
                            <form className="form-inline">
                            <input className="form-control" type="text" name="search_key" placeholder="Search" aria-label="Search"
                    onChange={handlekeySearch} />
                                <img src="../assets/images/search.png" alt="sort-img" />
                            </form>
                        </div>
                    </div>
                    <BootstrapTable
                        keyField='id'
                        data={customers}
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

export default Customer;