import React, { useState, useRef, useEffect } from "react";
import apiurl from "@component/api/apiconfig";
import { imagepath } from "@component/functions/commonfunction";
import axiosInstance from "@component/api/axiosinstance";
import axiosInstanceMultipart from "@component/api/axiosinstancemultipart";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from "next/router";
import swal from "sweetalert";
import * as yup from "yup";
import Icon from "../icon";

const Settings = () => {
    const router = useRouter();
    let imageLocation = imagepath();
    const [previewfile, setFile] = useState();
    const [adminDetails, setAdminDetails] = useState([]);
    useEffect(() => {

        axiosInstance.get(apiurl + 'auth/admin-details')
            .then((response) => {

                if (response.status === 1) {
                    setAdminDetails(response.data);
                }

            })
            .catch((error) => {
                console.error('Error fetching data:', error);

            });
    }, [])

console.log(adminDetails);


    const submitHandler = (values) => {

        axiosInstanceMultipart.post(apiurl + 'auth/update-profile', values)
            .then((response) => {
                if (response.status === 1) {

                    swal("success", "Profile updated successfully", "success");
                }
                else if (response.status === 2 && response.errors != '') {
                    swal("Error", response.errors, "error");
                }
            })
            .catch((error) => {
                if (error.response.data.status === 2 && typeof error.response.data.message !== 'undefined') {

                    swal("Error", error.response.data.message, "error");
                }
                else if (error.response.data.status === 2 && typeof error.response.data.errors.primary_phone_no
                    !== 'undefined') {
                    swal("Error", 'Phone number length must be less than or equal to 10 characters long', "error");
                }
                else {
                    swal("Error", 'Error in profile updation', "error");
                }
            });
    };

    let initialValues = {
        firstName: '',
        lastName: '',
        file: null,
    };
    //console.log(DbDetails);      


    return (
        <>
            <section className="delivery-boy-panel">
                <div className="container">

                    <h4>Update Profile</h4>
                    <Formik
                        enableReinitialize={true}
                        initialValues={Object.assign(initialValues, {
                            firstName: adminDetails.firstName ? adminDetails.firstName : "",
                            lastName: adminDetails.lastName ? adminDetails.lastName : "",
                        })}

                        validationSchema={
                            yup.object().shape({
                                firstName: yup.string().required("First name is required"),
                                lastName: yup.string().required("First name is required"),

                            })
                        }

                        onSubmit={(values, { resetForm }) => {
                          //  console.log(values);
                            submitHandler(values);
                            //resetForm({ values: '' });
                        }}
                    >
                        {({ errors, touched, setFieldValue }) => (

                            <Form>
                                <div className="my-account-layout">
                                    <div className="my-account-elm">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="user-img">

                                                    <span className="profile-picture text-center">
                                                        <img className="p-detail-image" src={previewfile ? previewfile : adminDetails.new_profile_image_name} alt="doorbell" />
                                                    </span>

                                                    <div className="upload-btn-wrapper">
                                                        <button className="upload-btn" type="button"><Icon icon="fas fa-camera"></Icon></button>
                                                        <input
                                                            type="file"
                                                            id="file"
                                                            name="file"
                                                            onChange={(event) => {
                                                                setFieldValue('file', event.currentTarget.files[0]);
                                                                setFile(URL.createObjectURL(event.target.files[0]));


                                                            }}
                                                        />
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="my-account-elm mt-4 mt-lg-0">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="form-group">
                                                        <Field
                                                            type="text"
                                                            name="firstName"
                                                            className="form-control mb-2"
                                                            id="firstName"
                                                            placeholder="First Name"
                                                           

                                                        />
                                                        {touched.firstName && errors.firstName && <div className="form-error">{errors.firstName}</div>}
                                                    </div>
                                                    <div className="form-group">
                                                        <Field
                                                            type="text"
                                                            name="lastName"
                                                            className="form-control mb-2"
                                                            id="lastName"
                                                            placeholder="Last Name"

                                                        />
                                                        {touched.lastName && errors.lastName && <div className="form-error">{errors.lastName}</div>}
                                                    </div>

                                                    <div className="form-group">
                                                        <Field
                                                            type="email"
                                                            name="email"
                                                            className="form-control mb-2"
                                                            id="email"
                                                            placeholder="Email"
                                                            readonly=""
                                                            value={adminDetails.email}

                                                        />
                                                       
                                                    </div>
                                                    <div className="form-group">
                                                        <Field
                                                            type="date"
                                                            name="dob"
                                                            className="form-control mb-2"
                                                            id="dob"
                                                            placeholder="Date Of Birth"
                                                            readonly=""
                                                            value={adminDetails.dob}

                                                        />
                                                       
                                                    </div>
                                                    <div className="form-group">
                                                        <Field
                                                            type="number"
                                                            name="primary_phone_no"
                                                            className="form-control mb-2"
                                                            id="primary_phone_no"
                                                            placeholder="Phone Number"
                                                            readonly=""
                                                            value={adminDetails.primary_phone_no}

                                                        />
                                                       
                                                    </div>
                                                    <div className="form-group">
                                                        <Field
                                                            type="text"
                                                            name="address"
                                                            className="form-control mb-2"
                                                            id="address"
                                                            placeholder="Address"
                                                            readonly=""
                                                            value={adminDetails.address}

                                                        />
                                                
                                                    </div>
                                               
                                                    <div className="form-group">
                                                        <Field
                                                            type="number"
                                                            name="pincode"
                                                            className="form-control mb-2"
                                                            id="pincode"
                                                            placeholder="Pincode"
                                                            readonly=""
                                                            value={adminDetails.pincode}

                                                        />
                                                    </div>


                                                    <p className="form-submit text-right">
                                                        <button type="submit" className="btn btn-save">SAVE</button>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </section>
        </>
    );
}

export default Settings;