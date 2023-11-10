import React, { useState, useEffect } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import { DateRangePicker } from 'rsuite';
import { imagepath, per_page_item, NoDataText, OrderStatus, OrderStatusClass, paymentStatus, paymentStatusCLass, pickedUpStatus, pickedUpStatusCLass, getSelfServedCount, lsServedCount } from "@component/functions/commonfunction";
import apiurl from "@component/api/apiconfig";
import dateFormat from "dateformat";
import axiosInstance from "@component/api/axiosinstance";
import Icon from "../icon";

const Order = () => {
    let imageLocation = imagepath();
    const [orderData, setData] = useState([]);
    const [total_items, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [hover, setHover] = useState(0);
    const [CurrentIndex, setcurrentIndex] = useState(0);
    const itemsPerPage = per_page_item();
    let ItemNotFound = NoDataText();
    const [emptyDataMessage, SetNodataText] = useState('');
    const [filterKey, setKeyFilter] = useState('');

    const [FilterDateRange, setRangeFilter] = useState(null);
    const [FilterByPaymentStatus, setPaymentStatus] = useState('');
    const [FilterByDeliveryStatus, setDeliveryStatus] = useState('');
    let dateRange = '';
    if (FilterDateRange !== null) {

        dateRange = '&date_range_start=' + dateFormat(`${FilterDateRange[0]}`, "yyyy-mm-dd") + '&date_range_end=' + dateFormat(`${FilterDateRange[1]}`, "yyyy-mm-dd");
    }
    // Function to perform the GET request
    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(apiurl + 'order/order-list?page=' + currentPage + '&limit=' + itemsPerPage + filterKey + FilterByPaymentStatus + FilterByDeliveryStatus + dateRange);
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
    }, [currentPage, filterKey, FilterByPaymentStatus, FilterByDeliveryStatus, dateRange]);


    const indexNum = (cell, row, index) => {
        return (<div>{CurrentIndex + 1 + index}</div>);
    }

    const csNameFormator = (cell, row) => {
        return `${row.customer.firstName} ${row.customer.lastName}`;
    }
    const OrderNumberFormator = (cell, row) => {
        return (<a href={'/order-details/' + row.id} className="order-details-id">{row.order_unique_id}</a>);
    }
    const dbNameFormator = (cell, row) => {
        return `${row.delivery_boy.firstName} ${row.delivery_boy.lastName}`;
    }

    const hsNameFormator = (cell, row) => {
        if (row.helper != null) {
            return `${row.delivery_boy.firstName} ${row.delivery_boy.lastName}`;
        }
        else {
            return '-';
        }

    }

    const pickup_requestFormator = (cell, row) => {
        if (row.pickup_request_date != null && row.pickup_request_time != null) {
            return dateFormat(`${row.pickup_request_date}`, "d mmm yyyy") + '|' + row.pickup_request_time;
        }
        else {
            return '';
        }
    }
    const totalAmounFormator = (cell, row) => {
        return (<span className="order-total-amount">{row.customer_total_amount !== null && typeof row.customer_total_amount !== 'undefined' && row.customer_total_amount.toFixed(2)}</span>)
    }

    const OrderstatusFormator = (cell, row) => {
        return (<span className={OrderStatusClass(row.order_status)}>{OrderStatus(row.order_status)}</span>)
    }

    const paymentStatusFormator = (cell, row) => {
        return (<span className={paymentStatusCLass(row.order_status)}>{paymentStatus(row.order_status)}</span>)
    }

    const deliveryDateFormator = (cell, row) => {
        return (<span> {dateFormat(row.customer_delivery_date, "dS mmm, yyyy")} | {row.customer_delivery_time}</span>)
    }

    const pickedUpStatusFormator = (cell, row) => {
        return (<span className={pickedUpStatusCLass(row.order_status)}>{pickedUpStatus(row.order_status)}</span>)
    }

    const selfServeFormator = (cell, row) => {
        return getSelfServedCount(row.order_details);
    }
    const lsServeFormator = (cell, row) => {
        return lsServedCount(row.order_details);
    }

    const RatingFormator = (cell, row) => {
        if (row.order_rating !== null && typeof row.order_rating !== 'undefined') {
            return (<div className="star-rating">
                {[...Array(5)].map((star, index) => {
                    index += 1;
                    return (
                        <button
                            type="button"
                            key={index}
                            className={index <= (hover || row.order_rating.rating) ? "on" : "off"}
                            onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover(row.order_rating.rating)}
                        >
                            <span className="star">&#9733;</span>
                        </button>
                    );
                })}
            </div>)
        }
        else {
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
            text: 'Order ID',
            formatter: OrderNumberFormator
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
            text: 'Pickup Status',
            formatter: pickedUpStatusFormator
        },
        {
            dataField: 'order_total_quantity',
            text: 'Cloth Count'
        },
        {
            dataField: 'self_serve',
            text: 'Self Serve',
            formatter: selfServeFormator
        },
        {
            dataField: 'ls_serve',
            text: 'LS Serve',
            formatter: lsServeFormator
        },
       
        {
            dataField: 'proposed_delivery_date',
            text: 'Proposed Delivery Date',
            formatter: deliveryDateFormator
        },
        {
            dataField: 'delivery_status',
            text: 'Delivery Status',
            formatter: OrderstatusFormator
        },
        {
            dataField: 'bill_amount',
            text: 'Bill Amount',
            formatter: totalAmounFormator

        },
        {
            dataField: 'payment_status',
            text: 'Payment Status',
            formatter: paymentStatusFormator
        },
        {
            dataField: 'ratings_by_cs',
            text: 'Ratings by CS',
            formatter: RatingFormator
        },

    ];

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        if (pageNumber == 1) {
            setcurrentIndex(0);

        }
        else {
            setcurrentIndex(parseInt(pageNumber - 1) * CurrentIndex);
        }
    };


    const handlekeySearch = (event) => {
        //set_Search_key(event.target.value);
        if (event.target.value != '') {
            setKeyFilter('&search_key=' + event.target.value.trim());
            setCurrentPage(1);
            setcurrentIndex(0);
        }
        else {
            setKeyFilter('');
            setCurrentPage(1);
            setcurrentIndex(0);
        }
    };

    const handlePSSearch = (event) => {
        //set_Search_key(event.target.value);
        if (event.target.value != '') {
            setPaymentStatus('&payment_status=' + event.target.value.trim());
            setCurrentPage(1);
            setcurrentIndex(0);
        }
        else {
            setPaymentStatus('');

            setCurrentPage(1);
            setcurrentIndex(0);
        }
    };

    const handleDeliveryStatus = (event) => {
        //set_Search_key(event.target.value);
        if (event.target.value != '') {
            setDeliveryStatus('&order_status_id=' + event.target.value.trim());
            setCurrentPage(1);
            setcurrentIndex(0);
        }
        else {
            setDeliveryStatus('');

            setCurrentPage(1);
            setcurrentIndex(0);
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

    return (
        <>
            <section className="order-panel">
                <h1>Order</h1>
                <div className="common-table">
                    <div className="table-header">
                        <div className="table-search">
                            <form className="d-flex form-inline">
                                <input className="form-control" type="text" name="search_key" placeholder="Search" aria-label="Search" onChange={handlekeySearch} />
                                <img src="./assets/images/search.png" alt="sort-img" />


                                <div className="select-dropdown table-select d-none">
                                    <img src="./assets/images/sort-down-small.png" alt="sort-img" />
                                    <select className="select">
                                        <option value="">By Type</option>
                                        <option value="1">Type 1</option>
                                        <option value="2">Type 2</option>
                                        <option value="3">Type 3</option>
                                    </select>
                                </div>
                                <div className="select-dropdown table-select d-none">
                                    <img src="./assets/images/sort-down-small.png" alt="sort-img" />
                                    <select className="select">
                                        <option value="">Select DB</option>
                                        <option value="1">DB 1</option>
                                        <option value="2">DB 2</option>
                                        <option value="3">DB 3</option>
                                    </select>
                                </div>
                                <div className="select-dropdown table-select d-none">
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
                                    <select className="select" name="order_status_id" onChange={handleDeliveryStatus}>
                                        <option value="">Delivery Status</option>
                                        <option value="1">Pickup Request</option>
                                        <option value="2">DB Pickup Request Accepted</option>
                                        <option value="3">DB Pickup Request Rejected</option>
                                        <option value="4">Helper Request Accepted</option>
                                        <option value="5">Helper Request Rejected</option>
                                        <option value="6">Issue Raised By DB</option>
                                        <option value="7">Picked Up</option>
                                        <option value="8">Issue Rejected By Customer</option>
                                        <option value="9">Partially Handover to Laundry</option>
                                        <option value="10">Complete Order Handover To Laundry</option>
                                        <option value="11">Complete Order Collected From Laundry</option>
                                        <option value="12">Handover Done To Customer</option>
                                        <option value="13">Customer Confirms Cloths Received</option>
                                        <option value="14">Order Completed(Payment Done)</option>
                                    </select>
                                </div>
                                <div className="select-dropdown table-select">
                                    <img src="./assets/images/sort-down-small.png" alt="sort-img" />
                                    <select className="select" name="payment_status" onChange={handlePSSearch}>
                                        <option value="">Payment Status</option>
                                        <option value="1">Paid</option>
                                        <option value="2">Partially Paid</option>
                                        <option value="3">Skipped</option>
                                        <option value="4">Unpaid</option>
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
                        data={orderData}
                        columns={columns}
                        wrapperClasses="table-responsive"
                        noDataIndication={emptyDataMessage}
                    />
                    {PaginationHtml()}
                </div>
            </section>
        </>
    )
}

export default Order;