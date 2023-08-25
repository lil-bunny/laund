import React, { useState,useRef,useEffect } from "react";
import Overlay from 'react-bootstrap/Overlay';
import BootstrapTable from 'react-bootstrap-table-next';
import AddModal from "../modal/AddModal";
import dateFormat from "dateformat";
import { useRouter } from "next/router";
import apiurl from "@component/api/apiconfig";
import { imagepath } from "@component/functions/commonfunction";
import axiosInstance from "@component/api/axiosinstance";
import Icon from "../icon";
const DeliveryBoyDetails = () => {
    const [show, setShow] = useState(false);
    const target = useRef(null);
    const router = useRouter();
    const {id} = router.query;
    const [data, setData] = useState([]);

       useEffect(() => {
        // Function to perform the GET request
        const fetchData = async () => {
          try {
            const response = await axiosInstance.post(apiurl+'laundry-associate-details',{id});
            if(response.status===1){
            setData(response.data); // Assuming the response contains the data you need
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData(); // Call the function to fetch the data
      }, []);
    return (
        <>
            <section className="db-details-panel">
                <h1>Delivery Boy Details</h1>
                <div className="db-details-content">
                    <div className="db-details-content-heading">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="db-id">
                                    <h2>DB{data.id}</h2>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="db-helper">

                                    <img ref={target} onClick={() => setShow(!show)} src={imagepath()+'Menu-Vertical.png'} alt="menu-img" />
                                    <Overlay target={target.current} show={show} placement="left">
                                        {({
                                            placement: _placement,
                                            arrowProps: _arrowProps,
                                            show: _show,
                                            popper: _popper,
                                            hasDoneInitialMeasure: _hasDoneInitialMeasure,
                                            ...props
                                        }) => (
                                            <div className="tooltip"
                                                {...props}
                                                style={{
                                                    position: 'absolute',
                                                    fontWeight: '600',
                                                    fontSize: '14px',
                                                    ...props.style,
                                                }}
                                            >

                                                Enrolled for 12 months
                                                <span>20 Dec 2022 - 20 Jun 2023</span>
                                            </div>
                                        )}
                                    </Overlay>
                                </div>
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
                                                <img src={ data.new_profile_image_name ? data.new_profile_image_name : imagepath()+'dummy.png'} alt="prof-img" />
                                            </span>
                                            <div className="right-prof-panel">
                                                <h2>{data.firstName} {data.lastName}</h2>
                                                <p>Delivery Boy</p>
                                                <span className="db-contact">
                                                    Contact No: <span>{data.primary_phone_no}</span>
                                                </span>
                                                <span className="db-prof-address">
                                                {data.address}, {data.cityName} {data.pincode}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <span className="profile-footer-border"></span>
                            </div>
                        </div>
                        <div className="row content-row">
                            <div className="col-md-6">
                                <h4>Enrollment Details</h4>
                                <p>If you made any changes, it will be affect from next Enrollment / Order.</p>
                                <div className="row enrollment-row">
                                    <div className="col-md-6">
                                        <h5>Self Enrollment Fee</h5>
                                        <div className="select-dropdown db-select">
                                            <img src="/assets/images/sort-down-small.png" alt="sort-img" />
                                            <select className="select">
                                                <option value="">Month</option>
                                                <option value="1">1 Month</option>
                                                <option value="2">2 Month</option>
                                                <option value="3">3 Month</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="db-input">
                                            <input type="text" defaultValue={250} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row enrollment-row">
                                    <div className="col-md-6">
                                        <h5>Self Enrollment Fee</h5>
                                        <div className="select-dropdown db-select">
                                            <img src="/assets/images/sort-down-small.png" alt="sort-img" />
                                            <select className="select">
                                                <option value="">Month</option>
                                                <option value="1">1 Month</option>
                                                <option value="2">2 Month</option>
                                                <option value="3">3 Month</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="db-input">
                                            <input type="text" defaultValue={250} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row enrollment-row pb-0">
                                    <div className="col-md-6">
                                        <h5>Self Enrollment Fee</h5>
                                        <div className="select-dropdown db-select">
                                            <img src="/assets/images/sort-down-small.png" alt="sort-img" />
                                            <select className="select">
                                                <option value="">Month</option>
                                                <option value="1">1 Month</option>
                                                <option value="2">2 Month</option>
                                                <option value="3">3 Month</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="db-input">
                                            <input type="text" defaultValue={20} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row transaction-row">
                                    <div className="col-md-6">
                                        <label>Transaction Fee (per order)</label>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="db-input">
                                            <input type="text" defaultValue={250} />
                                        </div>
                                    </div>
                                </div>
                                <div className="content-right-border"></div>
                            </div>
                            <div className="col-md-6">
                                <div className="document-contents">
                                    <h4>Documents</h4>
                                    <p>Aadhar Number</p>
                                    <h5>1234-4567-7891-0987</h5>

                                </div>
                                <div className="document-contents">
                                    <div className="row">
                                        <div className="col-md-5">
                                            <div className="aadhar-front">
                                                <h4>Account Details</h4>
                                                <p>Bank Account Number</p>
                                                <h5>1234-4567-7891-0987</h5>
                                            </div>
                                        </div>
                                        <div className="col-md-7">
                                            <div className="aadhar-back">
                                                <h4>Account Details</h4>
                                                <p>Bank IFSC Code</p>
                                                <h5>SBINO000056</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="document-contents">
                                    <div className="aadhar-back">
                                        <p>Mobile Number for UPI Payment</p>
                                        <h5>8796231343</h5>
                                    </div>
                                </div>
                            </div>
                            <span className="profile-footer-border"></span>
                            <div className="footer-button">
                                <button className="btn btn-sm" type="submit">CANCEL</button>
                                <button className="btn btn-sm" type="submit">Save</button>
                            </div>
                        </div>
                    </div>
                </div >
            </section >
        </>
    )
}

export default DeliveryBoyDetails;