import React, { useState, useRef, useEffect } from "react";
import Overlay from "react-bootstrap/Overlay";
import PaymentListModal from "../modal/PaymentListModal";
import dateFormat from "dateformat";
import apiurl from "@component/api/apiconfig";
import { imagepath } from "@component/functions/commonfunction";
import axiosInstance from "@component/api/axiosinstance";
import Link from "next/link";
import { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import swal from "sweetalert";

const LaundryDetails = () => {
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const handleClose = () => setModalShow(false);
  const target = useRef(null);
  const [laundyDetails, setData] = useState([]);
  const [paymentList, setPaymentListData] = useState([]);
  const router = useRouter();
  let imageLocation = imagepath();
  const { id } = router.query;
  const lsID = router.query.id;
  console.log(lsID);
  // Function to perform the GET request
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(
        apiurl + "laundry-service/laundry-detail/" + id
      );
      if (response.status === 1) {
        setData(response.data); // Assuming the response contains the data you need
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData(); // Call the function to fetch the data
  }, []);

  const fetchPendingAmontData = async () => {
    try {
      const response = await axiosInstance.get(
        apiurl + "laundry-service/db-pending-amount-list?ls_id=" + lsID
      );
      if (response.status === 1) {
        setPaymentListData(response.data); // Assuming the response contains the data you need
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchPendingAmontData(); // Call the function to fetch the data
  }, []);
  const backHandler = () => {
    //  localStorage.removeItem('token');
    router.push("/laundry");
  };
  const submitHandler = (values) => {
    axiosInstance
      .post(
        apiurl + "laundry-service/update-per-day-order-acceptance-limit",
        values
      )
      .then((response) => {
        if (response.status === 1) {
          swal(
            "success",
            "Order acceptance limit updated successfully",
            "success"
          );
          // navigate('/');
        }
      })
      .catch((error) => {
        swal("Error", "Error in limit updation", "error");
      });
  };
  let initialValues = {
    ls_id: "",
    order_acceptance_limit: "",
  };
  return (
    <>
      <section className="db-details-panel">
        <h1>LS Details</h1>
        <div className="laundry-details db-details-content">
          <div className="db-details-content-heading">
            <div className="row">
              <div className="col-md-6">
                <div className="db-id">
                  <h2>LS{laundyDetails.id}</h2>
                </div>
              </div>
              <div className="col-md-6">
                <div className="db-helper d-none">
                  <img
                    ref={target}
                    onClick={() => setShow(!show)}
                    src={imageLocation + "menu-vertical.png"}
                  />
                  <Overlay target={target.current} show={show} placement="left">
                    {({
                      placement: _placement,
                      arrowProps: _arrowProps,
                      show: _show,
                      popper: _popper,
                      hasDoneInitialMeasure: _hasDoneInitialMeasure,
                      ...props
                    }) => (
                      <div
                        className="tooltip"
                        {...props}
                        style={{
                          position: "absolute",
                          fontWeight: "600",
                          fontSize: "14px",
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

          <div className="laundry-details db-details-contents">
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-8">
                    <div className="db-details-profile">
                      <span className="profile-image">
                        <img
                          src={
                            laundyDetails.new_profile_image_name
                              ? laundyDetails.new_profile_image_name
                              : imagepath() + "dummy.png"
                          }
                          alt="prof-img"
                        />
                      </span>
                      <div className="right-prof-panel">
                        <h2>
                          {laundyDetails.firstName} {laundyDetails.lastName}
                        </h2>
                        <span className="db-contact">
                          Contact No:{" "}
                          <span>{laundyDetails.primary_phone_no}</span>
                        </span>
                        <span className="db-prof-address">
                          {laundyDetails.address},{laundyDetails.cityName},
                          {laundyDetails.pincode}
                        </span>
                        <div className="enroll-name">
                          Enrolled By: <span>DB-Arun Chaterjee</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <span className="profile-footer-border"></span>
              </div>
            </div>
            <div className="row content-row">
              <Formik
                enableReinitialize={true}
                initialValues={Object.assign(initialValues, {
                  order_acceptance_limit:
                    laundyDetails.per_day_order_acceptance_limit
                      ? laundyDetails.per_day_order_acceptance_limit
                      : "",
                      ls_id:lsID ? lsID : "",
                })}
                validationSchema={yup.object().shape({
                  order_acceptance_limit: yup
                    .string()
                    .required("Order acceptance value is required"),
                })}
                onSubmit={(values, { resetForm }) => {
                  //console.log(values);
                  submitHandler(values);
                  resetForm({ values: "" });
                }}
              >
                {({ errors, touched, setFieldValue }) => (
                  <Form>
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="order-limit-panel">
                            Enter per day order acceptance limit
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="db-input">
                          <Field
                              type="hidden"
                              name="ls_id"
                              id="ls_id"
                            />
                            <Field
                              type="number"
                              name="order_acceptance_limit"
                              id="order_acceptance_limit"
                              min={1}
                            />
                            {touched.order_acceptance_limit &&
                              errors.order_acceptance_limit && (
                                <div className="form-error">
                                  {errors.order_acceptance_limit}
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                      <div className="payment-button">
                        <button
                          type="button"
                          className="btn"
                          onClick={() => setModalShow(true)}
                        >
                          Rs.{" "}
                          <span>
                            {laundyDetails.pending_amount !== null &&
                              typeof laundyDetails.pending_amount !==
                                "undefined" &&
                              laundyDetails.pending_amount.toFixed(2)}
                          </span>{" "}
                          Payment Due
                        </button>
                      </div>
                    </div>
                    {/* <div className="col-md-6">
                                <div className="document-contents">
                                    <h4>Documents</h4>
                                    <p>Aadhar Number</p>
                                    <h5>1234-4567-7891-0987</h5>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="aadhar-front">
                                                <img src="../assets/images/aadhar-front.png" alt="front-img" />
                                                <p>Front</p>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="aadhar-back">
                                                <img src="../assets/images/aadhar-back.png" alt="back-img" />
                                                <p>Back</p>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="shop">
                                                <img src="../assets/images/shop.png" alt="shop-img" />
                                                <p>Shop</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="document-contents">
                                    <div className="aadhar-back">
                                        <p>GST Number</p>
                                        <h5>1234-4567-7891-0987</h5>
                                    </div>
                                </div>
                            </div> */}
                    <span className="profile-footer-border"></span>
                    <div className="footer-button">
                      <button
                        className="btn btn-sm"
                        type="button"
                        onClick={backHandler}
                      >
                        CANCEL
                      </button>
                      <button className="btn btn-sm" type="submit">
                        Save
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
      <PaymentListModal
        show={modalShow}
        onHide={handleClose}
        paymentList={paymentList}
        reamaining_amount={laundyDetails.pending_amount}
      />
    </>
  );
};

export default LaundryDetails;
