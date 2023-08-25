import React, { useState,useEffect } from "react";
import apiurl from "@component/api/apiconfig";
import axiosInstance from "@component/api/axiosinstance";

import Badge from 'react-bootstrap/Badge';

const Notification = () => {
    const [db_notification, DbNotificationData] = useState([]);
    const [cs_notification, CsNotificationData] = useState([]);
    const [ls_notification, LsNotificationData] = useState([]);
    

    
    useEffect(() => {
        // Function to perform the GET request
        const fetchData = async () => {
          try {
            const response = await axiosInstance.get(apiurl+'notification-list');
            if(response.status===1){
                DbNotificationData(response.db_notification);
                CsNotificationData(response.cs_notification);
                LsNotificationData(response.ls_notification); // Assuming the response contains the data you need
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData(); // Call the function to fetch the data
      }, []);

      console.log(db_notification);

    return (
        <>
            <section className="notification-panel">
                <h1>Notifications</h1>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-sm-12">
                            <div className="notification-box">
                                <div className="notification-box-header">
                                    <h2>Delivery Boy & Helper</h2>
                                </div>

                                {db_notification.map((value, key) => {
                                        return (
                                        <div className="content-box" key={key}>
                                            <h5 className="1">{value.text}</h5>
                                            <Badge className="2" bg="danger">{value.count}</Badge>
                                        </div>
                                        );
                                    })}
                                {/* <div className="content-box">
                                    <h5>Order Pickup Request</h5>
                                    <Badge bg="danger">100</Badge>
                                </div>
                                <div className="content-box">
                                    <h5>Order Picked up</h5>
                                    <Badge bg="danger">100</Badge>
                                </div>
                                <div className="content-box">
                                    <h5>Order Handover to LS</h5>
                                    <Badge bg="danger">100</Badge>
                                </div>
                                <div className="content-box">
                                    <h5>Order Handover to LS</h5>
                                    <Badge bg="danger">100</Badge>
                                </div>
                                <div className="content-box">
                                    <h5>Order Delivered</h5>
                                    <Badge bg="success">100</Badge>
                                </div>
                                <div className="content-box">
                                    <h5>Payments</h5>
                                    <Badge bg="dark">100</Badge>
                                </div>
                                <div className="content-box">
                                    <h5>Onboarding</h5>
                                    <Badge bg="danger">100</Badge>
                                </div>
                                <div className="content-box">
                                    <h5>Ratings</h5>
                                    <Badge bg="danger">100</Badge>
                                </div> */}
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-12">
                            <div className="notification-box">
                                <div className="notification-box-header">
                                    <h2>Laundry Service</h2>
                                </div>
                                {cs_notification.map((value, key) => {
                                        return (
                                        <div className="content-box" key={key}>
                                            <h5 className="1">{value.text}</h5>
                                            <Badge className="2" bg="danger">{value.count}</Badge>
                                        </div>
                                        );
                                    })}
                                {/* <div className="content-box">
                                    <h5>Order Accept</h5>
                                    <Badge bg="danger">100</Badge>
                                </div>
                                <div className="content-box">
                                    <h5>Order Ready</h5>
                                    <Badge bg="danger">100</Badge>
                                </div>
                                <div className="content-box">
                                    <h5>Order Picked by DB/Helper</h5>
                                    <Badge bg="success">100</Badge>
                                </div>
                                <div className="content-box">
                                    <h5>Order Issue Raised</h5>
                                    <Badge bg="danger">100</Badge>
                                </div>
                                <div className="content-box">
                                    <h5>Payments</h5>
                                    <Badge bg="dark">100</Badge>
                                </div>
                                <div className="content-box">
                                    <h5>Onboarding</h5>
                                    <Badge bg="danger">100</Badge>
                                </div>
                                <div className="content-box">
                                    <h5>Ratings</h5>
                                    <Badge bg="danger">100</Badge>
                                </div> */}
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-12">
                            <div className="notification-box">
                                <div className="notification-box-header">
                                    <h2>Customers</h2>
                                </div>
                                {ls_notification.map((value, key) => {
                                        return (
                                        <div className="content-box" key={key}>
                                            <h5 className="1">{value.text}</h5>
                                            <Badge className="2" bg="danger">{value.count}</Badge>
                                        </div>
                                        );
                                    })}
                                {/* <div className="content-box">
                                    <h5>Order Picked up</h5>
                                    <Badge bg="danger">100</Badge>
                                </div>
                                <div className="content-box">
                                    <h5>Order Delivered</h5>
                                    <Badge bg="success">100</Badge>
                                </div>
                                <div className="content-box">
                                    <h5>Payments</h5>
                                    <Badge bg="dark">100</Badge>
                                </div>
                                <div className="content-box">
                                    <h5>Payments</h5>
                                    <Badge bg="dark">100</Badge>
                                </div>
                                <div className="content-box">
                                    <h5>Onboarding</h5>
                                    <Badge bg="danger">20</Badge>
                                </div>
                                <div className="content-box">
                                    <h5>Rartings</h5>
                                    <Badge bg="danger">50</Badge>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Notification;