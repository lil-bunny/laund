import React, { useState, useEffect } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import Link from "next/link";
import { imagepath, per_page_item, NoDataText, OrderStatus, OrderStatusClass, paymentStatus, paymentStatusCLass } from "@component/functions/commonfunction";
import apiurl from "@component/api/apiconfig";
import axiosInstance from "@component/api/axiosinstance";
import { useRouter } from "next/router";
import dateFormat from "dateformat";

const CustomerDetails = () => {
    let imageLocation = imagepath();
    const [data, setData] = useState([]);
    const router = useRouter();
    const [hover, setHover] = useState(0);
    const [customeOrders, setOrderData] = useState([]);
    const { id } = router.query;
    const custome_id = router.query.id;
    const [total_items, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [CurrentIndex, setcurrentIndex] = useState(0);
    const itemsPerPage = per_page_item();
    let ItemNotFound = NoDataText();
    const [emptyDataMessage, SetNodataText] = useState('');
    useEffect(() => {
        // Function to perform the GET request
        const fetchData = async () => {
            try {
                const response = await axiosInstance.post(apiurl + 'customer/customer-details', { id });
                if (response.status === 1) {
                    setData(response.data); // Assuming the response contains the data you need
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Call the function to fetch the data
    }, []);


    const fetchOrderData = async () => {
        try {
            const response = await axiosInstance.get(apiurl + 'order/order-list?page=' + currentPage + '&limit=' + itemsPerPage + '&customer_id=' + custome_id);
            setOrderData(response.data); // Assuming the response contains the data you need
            setTotalItems(response.count);
            if (response.count == 0) {
                SetNodataText(ItemNotFound);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchOrderData(); // Call the function to fetch the data
    }, [currentPage]);

    const indexNum = (cell, row, index) => {
        return (<div>{CurrentIndex + 1 + index}</div>);
    }
    const dbNameFormator = (cell, row) => {
        return `${row.delivery_boy.firstName} ${row.delivery_boy.lastName}`;
    }
    const orderDateFormator = (cell, row) => {
        if (row.pickup_request_date != null && row.pickup_request_time != null) {
            return dateFormat(`${row.pickup_request_date}`, "d mmm yyyy") + '|' + row.pickup_request_time;
        }
        else {
            return '';
        }
    }

    const DeliveryDateFormator = (cell, row) => {
        if (row.customer_delivery_date != null && row.customer_delivery_time != null) {
            return dateFormat(`${row.customer_delivery_date}`, "d mmm yyyy") + '|' + row.customer_delivery_time;
        }
        else {
            return '';
        }
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


    const OrderstatusFormator = (cell, row) => {
        return (<span className={OrderStatusClass(row.order_status)}>{OrderStatus(row.order_status)}</span>)
    }

    const paymentStatusFormator = (cell, row) => {
        return (<span className={paymentStatusCLass(row.order_status)}>{paymentStatus(row.order_status)}</span>)
    }

    const totalAmounFormator = (cell, row) => {
        return (<span className="order-total-amount">{row.customer_total_amount !== null && typeof row.customer_total_amount!== 'undefined' && row.customer_total_amount.toFixed(2)}</span>)
    }

    const idFormator = (cell, row) => {
        return (<div className="custome-order-details"><a href={'/order-details/' + row.id}>{row.order_unique_id}</a> </div>)
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
            formatter: idFormator

        },
        {
            dataField: 'db_name',
            text: 'DB Name',
            formatter: dbNameFormator
        },
        {
            dataField: 'order_date',
            text: 'Order Date',
            formatter: orderDateFormator

        },
        {
            dataField: 'order_total_quantity',
            text: 'Cloths'
        },
        {
            dataField: 'customer_total_amount',
            text: 'Billing Amount',
            formatter: totalAmounFormator
        },
        {
            dataField: 'order_status',
            text: 'Order Status',
            formatter: OrderstatusFormator
        },
        {
            dataField: 'payment_status',
            text: 'Payment Status',
            formatter: paymentStatusFormator
        },
        {
            dataField: 'delivery_date',
            text: 'Delivery Date',
            formatter: DeliveryDateFormator
        },
        {
            dataField: 'ratings',
            text: 'Ratings',
            formatter: RatingFormator
        },
    ];
    const backHandler = () => {
        //  localStorage.removeItem('token');
        router.push('/customer');
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        if (pageNumber == 1) {
            setcurrentIndex(0);

        }
        else {
            setcurrentIndex(parseInt(pageNumber - 1) * CurrentIndex);
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

    //console.log(customeOrders);
    return (
        <>
            <section className="customer-details db-details-panel">
                <h1>Customer Details</h1>
                <div className="db-details-content">
                    <div className="db-details-content-heading">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="db-id">
                                    <h2>CS{data.id}</h2>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="cust-details-dropdown db-helper d-none">
                                    <div className="dropdown">
                                        <div className="btn" data-bs-toggle="dropdown">
                                            <img src="../assets/images/menu-vertical.png" alt="menu-img" />
                                        </div>
                                        <ul className="dropdown-menu">
                                            <li><Link href="#" className="dropdown-item">Check service rate</Link></li>
                                            <li><Link href="#" className="dropdown-item">Order history</Link></li>
                                            <li><Link href="#" className="dropdown-item">Block</Link></li>
                                            <li><Link href="#" style={{ color: '#ff0000' }} className="dropdown-item">Delete</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="db-details-contents">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="row">
                                            <div className="col-md-8">
                                                <div className="db-details-profile">
                                                    <span className="profile-image">
                                                        <img src={data.new_profile_image_name ? data.new_profile_image_name : imagepath() + 'dummy.png'} alt="prof-img" />
                                                    </span>
                                                    <div className="right-prof-panel">
                                                        <h2>{data.firstName} {data.lastName}</h2>
                                                        <span className="db-contact">
                                                            Contact No: <span>{data.primary_phone_no}</span>
                                                        </span>
                                                        <span className="db-prof-address">
                                                            {data.address}
                                                        </span>
                                                        <button className="btn btn-dark d-none">
                                                            Rs. <span>256</span> will be adjusted in next billing amount.
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="profile-footer-border"></span>
                                    </div>
                                </div>

                                <h2>Order History</h2>
                                <BootstrapTable
                                    keyField='order_unique_id'
                                    data={customeOrders}
                                    columns={columns}
                                    wrapperClasses="table-responsive"
                                    noDataIndication={emptyDataMessage}
                                />
                                {PaginationHtml()}
                                <div className="footer-button">
                                    <button className="btn btn-sm d-none" type="button">CANCEL</button>
                                    <button className="btn btn-sm" type="button" onClick={backHandler}>Back</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}

export default CustomerDetails;



