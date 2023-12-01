import React, { useState, useEffect } from "react";
import { imagepath ,paiichartBackroundColor} from "@component/functions/commonfunction";
import apiurl from "@component/api/apiconfig";
import axiosInstance from "@component/api/axiosinstance";
import Link from 'next/link';
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
    const [activeInactiveDb, setactiveInactiveDb] = useState([]);
    const [activeInactiveCS, setactiveInactiveCS] = useState([]);
    const [activeInactiveHelper, setactiveInactiveHelper] = useState([]);
    const [activeInactiveLs, setactiveInactiveLs] = useState([]);
    const [orderCountDetails, setorderCount] = useState([]);
    const [currentDay, setDay] = useState('today');
    const [paichartData, setPieChartData] = useState([]);
    const [paichartTime, setPaiChartTime] = useState('year');
    let paichartLabel=[];
    let paichatDataset=[];
    let paichatBackground=[];
    const bardata = {
        barThickness: 6,
        barPercentage: 0.5,
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [
            {
                // label: 'New',
                data: [3, 6, 25, 5, 8, 2, 6],
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
        labels: paichartLabel,
        datasets: [
            {
                data: paichatDataset,
                backgroundColor: paichatBackground,
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
    const handledDayChange = (event) => {
        //set_Search_key(event.target.value);
        if (event.target.value != '') {
            setDay(event.target.value);
        }
    };
   
    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(apiurl + 'dashboard/active-blocked-users-count');
         
          if(response.status==1){
            setactiveInactiveDb(response.data.db); // Assuming the response contains the data you need
            setactiveInactiveCS(response.data.cs);
            setactiveInactiveHelper(response.data.helper);
            setactiveInactiveLs(response.data.ls);

          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      useEffect(() => {
        fetchData(); // Call the function to fetch the data
      }, []);

      const fetchOrderData = async () => {
        try {
            const response = await axiosInstance.get(apiurl + 'dashboard/order-count?day='+currentDay);
          if(response.status==1){
            setorderCount(response.data);

          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      useEffect(() => {
        fetchOrderData(); // Call the function to fetch the data
      }, [currentDay]);

      const fetchpaiChartData = async () => {
        try {
            const response = await axiosInstance.get(apiurl + 'dashboard/pai-chart-data?time='+paichartTime);
          if(response.status==1){
            setPieChartData(response.data);

          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      useEffect(() => {
        fetchpaiChartData(); // Call the function to fetch the data
      }, [paichartTime]);


      console.log(paichartLabel);
    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="content-header-dropdown pull-right">
                        <div className="select-dropdown dashboard-header-dropdown">
                            <img src={imageLocation+'sort-down.png'} alt="sort-img" />
                            <select className="select" onChange={handledDayChange}>
                                <option value="today">Todays</option>
                                <option value="yesterday">Yesterday</option>
                                <option value="tomorrow">Tomorrow</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="top-content-box">
                                <h3>Today's New Orders</h3>
                                <p>{orderCountDetails.new_orders_count !== null && typeof orderCountDetails.new_orders_count!== 'undefined' && orderCountDetails.new_orders_count}</p>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="top-content-box">
                                <h3>Today's Delivered/Pending Orders</h3>
                                <p>{orderCountDetails.delivered_orders !== null && typeof orderCountDetails.delivered_orders!== 'undefined' && orderCountDetails.delivered_orders}/{orderCountDetails.pending_orders !== null && typeof orderCountDetails.pending_orders!== 'undefined' && orderCountDetails.pending_orders}</p>
                            </div>
                        </div>
                        </div>
                        <div className="row">
                        <div className="col-lg-6 col-md-6 d-none">
                            <div className="top-content-box">
                                <h3>Today's Earnings (in Rs.)</h3>
                                <p>76,503</p>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="top-content-box">
                                <h3>Customer Pending Bill's (in Rs.) </h3>
                                <p>{orderCountDetails.customer_pending_bill !== null && typeof orderCountDetails.customer_pending_bill!== 'undefined' && orderCountDetails.customer_pending_bill.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="top-content-box">
                                <h3>Laundry Pending Bill's (in Rs.) </h3>
                                <p>{orderCountDetails.laundry_pending_bill !== null && typeof orderCountDetails.laundry_pending_bill!== 'undefined' && orderCountDetails.laundry_pending_bill.toFixed(2)}</p>
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
                                        data={bardata}
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
                                {paichartData?.map((value_chart, keychart) => {
                                    paichartLabel.push(value_chart.category_name);
                                    paichatDataset.push(value_chart.count);
                                    paichatBackground.push(paiichartBackroundColor(value_chart.category_slug));
                                    return (
                                        <div key={keychart} className="pai-element">
                                        <span className={'square-box '+ value_chart.category_slug}></span><label>{value_chart.category_name}</label>
                                        </div>
                                    );
                                })}
                                    
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
                                <span>{activeInactiveDb.active}<p>Active</p></span>
                                <span>{activeInactiveDb.blocked}<p>Blocked</p></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-content-box">
                            <h3>Helper's</h3>
                            <div className="footer-content">
                                <span>{activeInactiveHelper.active}<p>Active</p></span>
                                <span>{activeInactiveHelper.blocked}<p>Blocked</p></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-content-box">
                            <h3>laundrie's</h3>
                            <div className="footer-content">
                                <span>{activeInactiveLs.active}<p>Active</p></span>
                                <span>{activeInactiveLs.blocked}<p>Blocked</p></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-content-box">
                            <h3>Customer's</h3>
                            <div className="footer-content">
                                <span>{activeInactiveCS.active}<p>Active</p></span>
                                <span>{activeInactiveCS.blocked}<p>Blocked</p></span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Dashboard;