import React from "react";

const Dashboard = () => {
    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="content-header-dropdown pull-right">
                        <div className="select-dropdown">
                            <img src="./assets/images/Sort-Down.png" alt="sort-img" />
                            <select className="select">
                                <option value="1">Todays</option>
                                <option value="2">Yesterday</option>
                                <option value="3">Tomorrow</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="top-content-box">
                                <h3>Today's New Orders</h3>
                                <p>360</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="top-content-box">
                                <h3>Today's Delivered/Pending Orders</h3>
                                <p>125/32</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="top-content-box">
                                <h3>Today's Earnings (in Rs.)</h3>
                                <p>76,503</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="top-content-box">
                                <h3>Pending Bill's (in Rs.)</h3>
                                <p>17,700</p>
                            </div>
                        </div>
                    </div>
                    <span className="break-line"></span>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mid-content-box"></div>
                        </div>
                        <div className="col-md-6">
                            <div className="mid-content-box"></div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="footer-content-box">
                                <h3>Delivery Boy's</h3>
                                <div className="footer-content">
                                    <span>83<p>Active</p></span>
                                    <span>03<p>Blocked</p></span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="footer-content-box">
                                <h3>Helper's</h3>
                                <div className="footer-content">
                                    <span>103<p>Active</p></span>
                                    <span>17<p>Blocked</p></span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="footer-content-box">
                                <h3>laundrie's</h3>
                                <div className="footer-content">
                                    <span>12<p>Active</p></span>
                                    <span>00<p>Blocked</p></span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="footer-content-box">
                                <h3>Customer's</h3>
                                <div className="footer-content">
                                    <span>12<p>Active</p></span>
                                    <span>00<p>Blocked</p></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Dashboard;