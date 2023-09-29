import React, { useState, useRef, useEffect } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import AddModal from "../modal/AddModal";
import dateFormat from "dateformat";
import apiurl from "@component/api/apiconfig";
import { imagepath } from "@component/functions/commonfunction";
import axiosInstance from "@component/api/axiosinstance";
import axiosInstanceMultipart from "@component/api/axiosinstancemultipart";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from "next/router";
import swal from "sweetalert";
import * as yup from "yup";
import Icon from "../icon";
let id = '1';

const DeliveryBoyUpdate = () => {
    const router = useRouter();
    let imageLocation = imagepath();
    const dbid = router.query;
    let dataid = { 'id': '' + dbid + '' };
    const [cityList, setDataCity] = useState([]);
    const [DbDetails, setDbdetails] = useState([]);
    useEffect(() => {
        // Function to perform the GET request
        const fetchData = async () => {
            try {
                const response = await axiosInstance.post('https://emerge2.indusnettechnologies.com/api/v1/delivery-boy/auth/city-list', { id });

                if (response.status === 1) {
                    setDataCity(response.data);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Call the function to fetch the data
    }, []);

    useEffect(() => {

        axiosInstance.post(apiurl + 'delivery-boy/laundry-associate-details', dbid)
            .then((response) => {

                if (response.status === 1) {
                    setDbdetails(response.data);
                }

            })
            .catch((error) => {
                console.error('Error fetching data:', error);

            });
    }, [])




    const submitHandler = (values) => {

        axiosInstanceMultipart.put(apiurl + 'update-laundry-associate/' + dbid.id, values)
            .then((response) => {
                if (response.status === 1) {

                    swal("success", "Delivery Boy updated successfully", "success");
                }
                else if (response.status === 2 && response.errors != '') {
                    swal("Error", response.errors, "error");
                }
            })
            .catch((error) => {
                //console.log('Error', error);
                swal("Error", error, "error");
            });
    };

    let initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        dob: '',
        primary_phone_no: '',
        address: '',
        city: '',
        pincode: '',
        file: null,
    };
    //console.log(DbDetails);      

    return (
        <>
            <section className="delivery-boy-panel">
                <div className="container">
                        
                                <h4>Update Delivery Boy</h4>
                                <Formik
                                    enableReinitialize={true}
                                    initialValues={Object.assign(initialValues, {
                                        firstName: DbDetails.firstName ? DbDetails.firstName : "",
                                        lastName: DbDetails.lastName ? DbDetails.lastName : "",
                                        email: DbDetails.email ? DbDetails.email : "",
                                        dob: DbDetails.dob ? DbDetails.dob : "",
                                        primary_phone_no: DbDetails.primary_phone_no ? DbDetails.primary_phone_no : "",
                                        address: DbDetails.address ? DbDetails.address : "",
                                        city: DbDetails.cityId ? DbDetails.cityId : "",
                                        pincode: DbDetails.pincode ? DbDetails.pincode : "",
                                    })}

                                    validationSchema={
                                        yup.object().shape({
                                            firstName: yup.string().required("First name is required"),
                                            lastName: yup.string().required("First name is required"),
                                            email: yup.string().required("Email is required"),
                                            dob: yup.string().required("Date of birth is required"),
                                            primary_phone_no: yup.string().required("Phone Number is required"),
                                            address: yup.string().required("Address is required"),
                                            city: yup.string().required("City is required"),
                                            pincode: yup.string().required("Pincode is required"),

                                        })
                                    }

                                    onSubmit={(values, { resetForm }) => {
                                        //console.log(values);
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
                                                                <img className="p-detail-image" src={DbDetails.new_profile_image_name ? DbDetails.new_profile_image_name : imageLocation + 'dummy.png'} alt="doorbell" />
                                                            </span>

                                                            <div className="upload-btn-wrapper">
                                                                <button className="upload-btn" type="button"><Icon icon="fas fa-camera"></Icon></button>
                                                                <input
                                                                    type="file"
                                                                    id="file"
                                                                    name="file"
                                                                    onChange={(event) => {
                                                                        setFieldValue('file', event.currentTarget.files[0]);

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

                                                            />
                                                            {touched.email && errors.email && <div className="form-error">{errors.email}</div>}
                                                        </div>
                                                        <div className="form-group">
                                                            <Field
                                                                type="date"
                                                                name="dob"
                                                                className="form-control mb-2"
                                                                id="dob"
                                                                placeholder="Date Of Birth"

                                                            />
                                                            {touched.dob && errors.dob && <div className="form-error">{errors.dob}</div>}
                                                        </div>
                                                        <div className="form-group">
                                                            <Field
                                                                type="number"
                                                                name="primary_phone_no"
                                                                className="form-control mb-2"
                                                                id="primary_phone_no"
                                                                placeholder="Phone Number"

                                                            />
                                                            {touched.primary_phone_no && errors.primary_phone_no && <div className="form-error">{errors.primary_phone_no}</div>}
                                                        </div>
                                                        <div className="form-group">
                                                            <Field
                                                                type="text"
                                                                name="address"
                                                                className="form-control mb-2"
                                                                id="address"
                                                                placeholder="Address"

                                                            />
                                                            {touched.address && errors.address && <div className="form-error">{errors.address}</div>}
                                                        </div>
                                                        <div className="form-group">
                                                            <Field as="select" name="city" id="city" className="form-control" >
                                                                <option value="">Select City</option>
                                                                {cityList.map((value, kayvalue) => {
                                                                    return (
                                                                        <option key={kayvalue} value={value.id}>
                                                                            {value.name}
                                                                        </option>
                                                                    );
                                                                })}

                                                            </Field>
                                                            {touched.city && errors.city && <div className="form-error">{errors.city}</div>}
                                                        </div>
                                                        <div className="form-group">
                                                            <Field
                                                                type="number"
                                                                name="pincode"
                                                                className="form-control mb-2"
                                                                id="pincode"
                                                                placeholder="Pincode"

                                                            />
                                                            {touched.pincode && errors.pincode && <div className="form-error">{errors.pincode}</div>}
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

export default DeliveryBoyUpdate;