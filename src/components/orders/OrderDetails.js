import React, { useState, useEffect } from "react";
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import dateFormat from "dateformat";
import apiurl from "@component/api/apiconfig";
import { imagepath, per_page_item, NoDataText } from "@component/functions/commonfunction";
import axiosInstance from "@component/api/axiosinstance";
import { useRouter } from "next/router";
import LsissueModal from "../modal/LsissueModal";
import OrderIssueModal from "../modal/OrderIssueModal";

const OrderDetails = () => {
    const [rating, setRating] = useState([]);
    const [hover, setHover] = useState(0);
    const [orderDetailsData, setData] = useState([]);
    const [orderCustomerDetails, setCustomerData] = useState([]);
    const [orderItemDetailsDetails, setOrderItemData] = useState([]);
    const [orderDBDetails, setOrderDBData] = useState([]);
    const [lsIssueRaised, setLsIssueData] = useState([]);
    const [orderDetailDate, setLOrderDetailsDate] = useState([]);
    const [orderissues, setOrderIssueData] = useState([]);
    const [orderDateData, setOrderDateData] = useState([]);
    const [issueImageUrl, setissueImage] = useState('');
    const [orderUniqueID, setorderID] = useState('');
    const imageLocation = imagepath();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const router = useRouter();
    const OrderID = router.query.id;
    // Function to perform the GET request
    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(apiurl + 'order/order-detail/' + OrderID);
            setData(response.data); // Assuming the response contains the data you need
            setissueImage(response.laundry_issue_url);
            
            setCustomerData(response.data.customer);
            setOrderItemData(response.data.order_details);
            setOrderDBData(response.data.delivery_boy);
            setRating(response.data.order_rating);
            setLsIssueData(response.data.order_details.laundry_order_issues);
            setOrderIssueData(response.data.order_issues);
            setorderID(response.data.order_unique_id)
            setOrderDateData(response.data.order_date)


        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData(); // Call the function to fetch the data
    }, []);

    const handlelsIssue = (lsIssue) => {
        setLsIssueData(lsIssue);
        setShow(true);


    };

    const handleOrderDates = (orderDates) => {
        setLOrderDetailsDate(orderDates);
       // setShow(true);


    };
    const handleOrderIssue = () => {
        setShow(true);
    };
    console.log(orderDetailDate);

    return (
        <>
            <section className="order-details-panel">
                <h1>Order Details</h1>
                <div className="order-details-content">
                    <div className="order-details-content-heading">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="order-id">
                                    <h2>{orderDetailsData.order_unique_id}</h2>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="db-helper">
                                    DB/Helper: <span>{orderDBDetails.firstName} {orderDBDetails.lastName}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="order-details-contents">
                        <div className="row">
                            <div className="col-md-9">
                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="order-details-profile">
                                            <span className="profile-image">
                                                <img src={orderCustomerDetails.profile_image ? orderCustomerDetails.profile_image : imageLocation + 'dummy.png'} alt="prof-img" />
                                            </span>
                                            <div className="right-prof-panel">
                                                <h2>{orderCustomerDetails.firstName} {orderCustomerDetails.lastName}</h2>
                                                <p>Contact No: {orderCustomerDetails.primary_phone_no}, {orderCustomerDetails.alternate_phone_no}</p>
                                                <span className="order-prof-address">
                                                    {orderCustomerDetails.address}
                                                </span>
                                                <span className="order-address-footer order-issue" onClick={() => handleOrderIssue()} title="Click to view order issues">
                                                    Order Issues ({orderissues.length})
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <span className="profile-footer-border"></span>
                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="order-details-section">
                                            <h3>Order Details</h3>
                                            <p>Delivery Date: {dateFormat(orderDetailsData.customer_delivery_date, "dS mmm, yyyy")} | {orderDetailsData.customer_delivery_time}</p>
                                            <Accordion defaultActiveKey="0">
                                                {orderItemDetailsDetails.map((value, kayvalue) => {
                                                    return (
                                                        <Accordion.Item eventKey={kayvalue} key={kayvalue}>
                                                            <Accordion.Header>
                                                                <span>{value.product_category.category_name}</span>
                                                                <span>{value.order_products.length} Cloths  {value.laundry !== null && typeof value.laundry !== 'undefined' &&  '|'+value.laundry.firstName + ' ' + value.laundry.lastName}
                                                                 
                                                                </span>
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                <Table hover>
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Item</th>
                                                                            <th>Qty.</th>
                                                                            <th>Rate</th>
                                                                            <th>Amount</th>
                                                                            <th>Ls Issue</th>
                                                                            <th>Order Journey</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {value.order_products?.map((value_product, kayvalue_product) => {
                                                                            return (
                                                                                <tr key={kayvalue_product}>
                                                                                    <td>{value_product.product.product_name}</td>
                                                                                    <td>{value_product.product_quantity}</td>
                                                                                    <td>{value_product.product_price !== null && typeof value_product.product_price !== 'undefined' && value_product.product_price.toFixed(2)}</td>
                                                                                    <td>{value_product.total_price !== null && typeof value_product.total_price !== 'undefined' && value_product.total_price.toFixed(2)}</td>
                                                                                    {kayvalue_product == 0 && <td className="ls-raised-issue" rowSpan={value.order_products.length}><span onClick={() => handlelsIssue(value.laundry_order_issues)} title="Click to view LS Raised Issue">LS Raised Issue ({value.laundry_order_issues.length})</span></td>}

                                                                                    {kayvalue_product == 0 && <td className="order-journey" rowSpan={value.order_products.length}><span onClick={() => handleOrderDates(value.order_details_date)}  title="Click to view order journey">Order Jurney </span></td>}
                                                                                </tr>

                                                                            );
                                                                        })}
                                                                    </tbody>
                                                                </Table>
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                    );
                                                })}
                                            </Accordion>
                                            <div className="accordion-footer">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <h4>Total Amount: <span>{orderDetailsData.customer_total_amount !== null && typeof orderDetailsData.customer_total_amount!== 'undefined' && orderDetailsData.customer_total_amount.toFixed(2)}</span></h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <span className="profile-footer-border"></span>
                                {
                                    (() => {
                                        if (rating !== null && typeof rating.rating !== 'undefined') {
                                            return (
                                                <div className="ratings-panel">
                                                    <h3>Ratings</h3>
                                                    <div className="star-rating">
                                                        {[...Array(5)].map((star, index) => {
                                                            index += 1;
                                                            return (
                                                                <button
                                                                    type="button"
                                                                    key={index}
                                                                    className={index <= (hover || rating.rating) ? "on" : "off"}
                                                                    onMouseEnter={() => setHover(index)}
                                                                    onMouseLeave={() => setHover(rating.rating)}
                                                                >
                                                                    <span className="star">&#9733;</span>
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                    <div className="star-rating-content">
                                                        <p>{rating.comment}
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })()
                                }


                            </div>
                            <div className="col-md-3">
                                <div className="order-journey-panel picked-up-panel">
                                    <h3>Order Journey</h3>
                                    <div className="order-journey-content">
                                        <span className="left-bar"></span>
                                        <p>Pickup Request</p>
                                        <span>{orderDateData.pickup_request_date !== null && typeof orderDateData.pickup_request_date !== 'undefined' && dateFormat(orderDateData.pickup_request_date, "dd mmm, yyyy | h:MM TT")} </span>
                                    </div>

                                    <div className="order-journey-content">
                                        <span className="left-bar"></span>
                                        <p>Pickup Request Accepted</p>
                                        <span>{orderDateData.pickup_request_accept_date !== null && typeof orderDateData.pickup_request_accept_date !== 'undefined' && dateFormat(orderDateData.pickup_request_accept_date, "dd mmm, yyyy | h:MM TT")} </span>
                                    </div>
                                    <div className="order-journey-content">
                                        <span className="left-bar"></span>
                                        <p>Pickup From Customer</p>
                                        <span>{orderDateData.picked_up_from_customer_date !== null && typeof orderDateData.picked_up_from_customer_date !== 'undefined' && dateFormat(orderDateData.picked_up_from_customer_date, "dd mmm, yyyy | h:MM TT")} </span>
                                    </div>
                                </div>
                    
                                    <span className="order-journey-footer-border"></span>
                                    <div className="order-journey-panel ls-panel">
                                    <div className="order-journey-content">
                                        <span className="left-bar"></span>
                                        <p>Assign to LS/Self</p>
                                        <span>{orderDetailDate!==null && orderDetailDate.assign_to_ls_or_self_date !== null && typeof orderDetailDate.assign_to_ls_or_self_date !== 'undefined' && dateFormat(orderDetailDate.assign_to_ls_or_self_date, "dd mmm, yyyy | h:MM TT")} </span>
                                    </div>
                                    <div className="order-journey-content">
                                        <span className="left-bar"></span>
                                        <p>Accepted by LS</p>
                                        <span>{orderDetailDate!==null && orderDetailDate.accepted_by_ls_date !== null && typeof orderDetailDate.accepted_by_ls_date !== 'undefined' && dateFormat(orderDetailDate.accepted_by_ls_date, "dd mmm, yyyy | h:MM TT")} </span>
                                    </div>
                                    <div className="order-journey-content">
                                        <span className="left-bar"></span>
                                        <p>Order ready by LS </p>
                                        <span>{orderDetailDate!==null && orderDetailDate.order_ready_by_ls_or_self_date !== null && typeof orderDetailDate.order_ready_by_ls_or_self_date !== 'undefined' && dateFormat(orderDetailDate.order_ready_by_ls_or_self_date, "dd mmm, yyyy | h:MM TT")} </span>
                                    </div>

                                    <div className="order-journey-content">
                                        <span className="left-bar"></span>
                                        <p>Picked up from LS </p>
                                        <span>{orderDetailDate!==null && orderDetailDate.picked_up_from_ls_date !== null && typeof orderDetailDate.picked_up_from_ls_date !== 'undefined' && dateFormat(orderDetailDate.picked_up_from_ls_date, "dd mmm, yyyy | h:MM TT")} </span>
                                    </div>
                                    
                                    </div>
                                    
                                    <span className="order-journey-footer-border"></span>
                                    <div className="order-journey-panel delivery-panel">
                                    <div className="order-journey-content">
                                        <span className="left-bar"></span>
                                        <p>Pickup For Delivery</p>
                                        <span>{orderDateData.picked_up_to_deliver_customer_date !== null && typeof orderDateData.picked_up_to_deliver_customer_date !== 'undefined' && dateFormat(orderDateData.picked_up_to_deliver_customer_date, "dd mmm, yyyy | h:MM TT")} </span>
                                    </div>
                                    <div className="order-journey-content">
                                        <span className="left-bar"></span>
                                        <p>To Be Deliver </p>
                                        <span>{dateFormat(orderDetailsData.customer_delivery_date, "dS mmm, yyyy")} | {orderDetailsData.customer_delivery_time}</span>
                                    </div>
                                    <div className="order-journey-content">
                                        <span className="left-bar"></span>
                                        <p>Order Delivered</p>
                                        <span>{orderDateData.order_delivered_to_customer_date !== null && typeof orderDateData.order_delivered_to_customer_date !== 'undefined' && dateFormat(orderDateData.order_delivered_to_customer_date, "dd mmm, yyyy | h:MM TT")} </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <LsissueModal show={show} onHide={handleClose} lsIssueRaised={lsIssueRaised} issueImageUrl={issueImageUrl} orderUniqueID={orderUniqueID}/>
            <OrderIssueModal show={show} onHide={handleClose} orderissues={orderissues} orderUniqueID={orderUniqueID}/>
        </>
    )
}

export default OrderDetails;