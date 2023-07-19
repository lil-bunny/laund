import React, { useState } from "react";
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';

const OrderDetails = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    return (
        <>
            <section className="order-details-panel">
                <h1>Order Details</h1>
                <div className="order-details-content">
                    <div className="order-details-content-heading">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="order-id">
                                    <h2>OD12345678</h2>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="db-helper">
                                    DB/Helper: <span>Sarmila K</span>
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
                                            <span className="profile-image"></span>
                                            <div className="right-prof-panel">
                                                <h2>Rahul Sethi</h2>
                                                <p>Contact No: 8796231143, 9822631107</p>
                                                <span className="order-prof-address">
                                                    Flat No 303, A Wing, Blosom Society, Ujwal Colony, Gajraj Chowk, Swargate, Pune 411041
                                                </span>
                                                <span className="order-address-footer">
                                                    LS Raised Issue
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
                                            <p>Delivery Date: 07 Dec. 2022 | 04:00PM-06:00PM</p>
                                            <Accordion defaultActiveKey="0">
                                                <Accordion.Item eventKey="0">
                                                    <Accordion.Header>
                                                        <span>Steam Iron</span>
                                                        <span>10 Cloths | Self by DB</span>
                                                    </Accordion.Header>
                                                    <Accordion.Body>
                                                        <Table hover>
                                                            <thead>
                                                                <tr>
                                                                    <th>Item</th>
                                                                    <th>Qty.</th>
                                                                    <th>Rate</th>
                                                                    <th>Amount</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>T-Shirt</td>
                                                                    <td>4</td>
                                                                    <td>4</td>
                                                                    <td>2</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Pant</td>
                                                                    <td>15</td>
                                                                    <td>20</td>
                                                                    <td>25</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Top</td>
                                                                    <td>60</td>
                                                                    <td>80</td>
                                                                    <td>50</td>
                                                                </tr>
                                                            </tbody>
                                                        </Table>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                                <Accordion.Item eventKey="1">
                                                    <Accordion.Header>
                                                        <span>Dry Cleaning</span>
                                                        <span>8 Cloths | Swach laundry Services</span>
                                                    </Accordion.Header>
                                                    <Accordion.Body>

                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                            <div className="accordion-footer">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <h4>Total Amount: <span>683.00</span></h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <span className="profile-footer-border"></span>
                                <div className="ratings-panel">
                                    <h3>Ratings</h3>
                                    <div className="star-rating">
                                        {[...Array(5)].map((star, index) => {
                                            index += 1;
                                            return (
                                                <button
                                                    type="button"
                                                    key={index}
                                                    className={index <= (hover || rating) ? "on" : "off"}
                                                    onClick={() => setRating(index)}
                                                    onMouseEnter={() => setHover(index)}
                                                    onMouseLeave={() => setHover(rating)}
                                                >
                                                    <span className="star">&#9733;</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <div className="star-rating-content">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                            Aliquam at velit convallis, interdum dui sit amet, egestas erat.
                                            Quisque malesuada blandit massa, nec laoreet purus aliquet eu.
                                            Fusce id enim mollis, malesuada mi eu, aliquet urna.
                                            Fusce molestie eu elit non bibendum. Duis blandit suscipit urna,
                                            eget mollis nisl condimentum at.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="order-journey-panel">
                                    <h3>Order Journey</h3>
                                    <div className="order-journey-content">
                                        <span className="left-bar"></span>
                                        <p>Pickup Request</p>
                                        <span>05 Dec. 2022 | 12:00PM - 02:00PM</span>
                                    </div>
                                    <div className="order-journey-content">
                                        <span className="left-bar"></span>
                                        <p>Pickup Request</p>
                                        <span>05 Dec. 2022 | 12:00PM - 02:00PM</span>
                                    </div>
                                    <div className="order-journey-content">
                                        <span className="left-bar"></span>
                                        <p>Pickup Request</p>
                                        <span>05 Dec. 2022 | 12:00PM - 02:00PM</span>
                                    </div>
                                    <div className="order-journey-content">
                                        <span className="left-bar"></span>
                                        <p>Pickup Request</p>
                                        <span>05 Dec. 2022 | 12:00PM - 02:00PM</span>
                                    </div>
                                    <span className="order-journey-footer-border"></span>
                                    <div className="order-journey-content">
                                        <span className="left-bar"></span>
                                        <p>Pickup Request</p>
                                        <span>05 Dec. 2022 | 12:00PM - 02:00PM</span>
                                    </div>
                                    <div className="order-journey-content">
                                        <span className="left-bar"></span>
                                        <p>Pickup Request</p>
                                        <span>05 Dec. 2022 | 12:00PM - 02:00PM</span>
                                    </div>
                                    <div className="order-journey-content">
                                        <span className="left-bar"></span>
                                        <p>Pickup Request</p>
                                        <span>05 Dec. 2022 | 12:00PM - 02:00PM</span>
                                    </div>
                                    <span className="order-journey-footer-border"></span>
                                    <div className="order-journey-content">
                                        <span className="left-bar"></span>
                                        <p>Pickup Request</p>
                                        <span>05 Dec. 2022 | 12:00PM - 02:00PM</span>
                                    </div>
                                    <div className="order-journey-content">
                                        <span className="left-bar"></span>
                                        <p>Pickup Request</p>
                                        <span>05 Dec. 2022 | 12:00PM - 02:00PM</span>
                                    </div>
                                    <div className="order-journey-content">
                                        <span className="left-bar"></span>
                                        <p>Pickup Request</p>
                                        <span>05 Dec. 2022 | 12:00PM - 02:00PM</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default OrderDetails;