import React from "react";
import { imagepath } from "@component/functions/commonfunction";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    Tooltip,
    Legend
)


const Dashboard = () => {
    let imageLocation=imagepath();
    const data = {
        barThickness: 6,
        barPercentage: 0.5,
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [
            {
                // label: 'New',
                data: [3, 6, 9, 5, 8, 2, 6],
                backgroundColor: '#5C88DA',
                borderColor: 'black',
                borderWidth: 1
            },
            {
                // label: 'Delivered',
                data: [3, 3, 3, 2, 7, 8, 1],
                backgroundColor: '#1AA301',
                borderColor: 'black',
                borderWidth: 1
            }
        ]
    };

    const pieData = {
        labels: ['One', 'Two', 'Three'],
        datasets: [
            {
                data: [3, 6, 9, 5, 7],
                backgroundColor: ['#791F06', '#EB5427', '#21D4C9', '#651080', '#E5E62B'],
                borderWidth: 0,
            }
        ]
    }

    const options = {
        plugins: {
            legend: {
                display: false
            }
        },
    }

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="content-header-dropdown pull-right">
                        <div className="select-dropdown dashboard-header-dropdown">
                            <img src={imageLocation+'sort-down.png'} alt="sort-img" />
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
                        <div className="col-lg-3 col-md-6">
                            <div className="top-content-box">
                                <h3>Today's New Orders</h3>
                                <p>360</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="top-content-box">
                                <h3>Today's Delivered/Pending Orders</h3>
                                <p>125/32</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="top-content-box">
                                <h3>Today's Earnings (in Rs.)</h3>
                                <p>76,503</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="top-content-box">
                                <h3>Pending Bill's (in Rs.)</h3>
                                <p>17,700</p>
                            </div>
                        </div>
                    </div>
                    <span className="break-line"></span>
                    <div className="row">
                        <div className="col-lg-6 col-md-12">
                            <div className="mid-content-box">
                                <div className="chart-container">
                                    <div className="chart-heading">
                                        <h3>Orders & Delivery</h3>
                                        <span className="blue-box"></span><label>New</label>
                                        <span className="green-box"></span><label>Delivered</label>
                                        <span className="red-box"></span><label>Pending</label>
                                        <div className="select-dropdown table-select">
                                            <img src={imageLocation+'sort-down-small.png'} alt="sort-img" />
                                            <select className="select">
                                                <option value="">This week</option>
                                                <option value="1">2nd Week</option>
                                                <option value="2">3rd week</option>
                                            </select>
                                        </div>
                                    </div>
                                    <Bar
                                        data={data}
                                        options={options}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <div className="mid-content-box">
                                <div className="pie-chart-container">
                                    <h3>Service Type Report</h3>
                                    <div className="select-dropdown table-select">
                                        <img src={imageLocation+'sort-down-small.png'} alt="sort-img" />
                                        <select className="select">
                                            <option value="">This week</option>
                                            <option value="1">2nd Week</option>
                                            <option value="2">3rd week</option>
                                        </select>
                                    </div>
                                    <Pie
                                        data={pieData}
                                        options={options}
                                    />
                                </div>
                                <div className="pie-footer">
                                    <span style={{background: '#EB5427'}} className="square-box"></span><label>Steam Iron</label>
                                    <span style={{background: '#791F06'}} className="square-box"></span><label>Washing & Pressing</label>
                                    <span style={{background: '#21D4C9'}} className="square-box"></span><label>Dry Cleaning</label>
                                    <span style={{background: '#651080'}} className="square-box"></span><label>Other</label>
                                    <span style={{background: '#E5E62B'}} className="square-box"></span><label>Washing</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-content-box">
                            <h3>Delivery Boy's</h3>
                            <div className="footer-content">
                                <span>83<p>Active</p></span>
                                <span>03<p>Blocked</p></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-content-box">
                            <h3>Helper's</h3>
                            <div className="footer-content">
                                <span>103<p>Active</p></span>
                                <span>17<p>Blocked</p></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-content-box">
                            <h3>laundrie's</h3>
                            <div className="footer-content">
                                <span>12<p>Active</p></span>
                                <span>00<p>Blocked</p></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-content-box">
                            <h3>Customer's</h3>
                            <div className="footer-content">
                                <span>12<p>Active</p></span>
                                <span>00<p>Blocked</p></span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Dashboard;