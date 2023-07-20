import React, { useState, useRef } from "react";
import Overlay from 'react-bootstrap/Overlay';

const DeliveryBoyDetails = () => {
    const [show, setShow] = useState(false);
    const target = useRef(null);

    return (
        <>
            <section className="db-details-panel">
                <h1>Delivery Boy Details</h1>
                <div className="db-details-content">
                    <div className="db-details-content-heading">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="db-id">
                                    <h2>DB12345</h2>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="db-helper">
                                    <img ref={target} onClick={() => setShow(!show)} src="./assets/images/Menu-Vertical.png" alt="menu-img" />
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
                                                <img src="./assets/images/dummy.png" alt="prof-img" />
                                            </span>
                                            <div className="right-prof-panel">
                                                <h2>Arun Chatterjee</h2>
                                                <p>Delivery Boy</p>
                                                <span className="db-contact">
                                                    Contact No: <span>8796231143, 9822631107</span>
                                                </span>
                                                <span className="db-prof-address">
                                                    Flat No 303, A Wing, Blosom Society, Ujwal Colony, Gajraj Chowk, Swargate, Pune 411041
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
                                            <img src="./assets/images/sort-down-small.png" alt="sort-img" />
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
                                            <img src="./assets/images/sort-down-small.png" alt="sort-img" />
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
                                            <img src="./assets/images/sort-down-small.png" alt="sort-img" />
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
                                    <div className="row">
                                        <div className="col-md-5">
                                            <div className="aadhar-front">
                                                <img src="./assets/images/aadhar-front.png" alt="menu-img" />
                                                <p>Front</p>
                                            </div>
                                        </div>
                                        <div className="col-md-7">
                                            <div className="aadhar-back">
                                                <img src="./assets/images/aadhar-back.png" alt="menu-img" />
                                                <p>Back</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="document-contents">
                                    <div className="row">
                                        <div className="col-md-5">
                                            <div className="aadhar-front">
                                                <h4>Account Details</h4>
                                                <p>Bank Account Number</p>
                                                <h5>1234-4567-7891-0987</h5>
                                                <img src="./assets/images/passbook.png" alt="menu-img" />
                                                <p>Front</p>
                                            </div>
                                        </div>
                                        <div className="col-md-7">
                                            <div className="aadhar-back">
                                                <h4>Account Details</h4>
                                                <p>Bank IFSC Code</p>
                                                <h5>SBINO000056</h5>
                                                <img src="./assets/images/cheque.png" alt="menu-img" />
                                                <p>Back</p>
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