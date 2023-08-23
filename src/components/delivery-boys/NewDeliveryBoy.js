import React, { useState,useEffect } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import AddModal from "../modal/AddModal";
import dateFormat from "dateformat";
import apiurl from "@component/api/apiconfig";
import { imagepath } from "@component/functions/commonfunction";
import axiosInstance from "@component/api/axiosinstance";
import axiosInstanceMultipart from "@component/api/axiosinstancemultipart";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import swal from "sweetalert";
import * as yup from "yup";
import Icon from "../icon";
let id='1';
const NewDeliveryBoy = () => {
    
    const [cityList, setDataCity] = useState([]);
    useEffect(() => {
        // Function to perform the GET request
        const fetchData = async () => {
          try {
            const response = await axiosInstance.post('http://143.110.242.57:8093/api/user/city-list',{id});
            
            if(response.status===1){
                setDataCity(response.data);
            }
           
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData(); // Call the function to fetch the data
      }, []);
 
    const submitHandler = (values) => {
   
        axiosInstanceMultipart.post(apiurl+'add-laundry-associate', values)
            .then((response) => {
                if (response.status === 1) {
                     
                 swal("success", "Delivery Boy added successfully", "success");
                     // navigate('/');
                }
                else if(response.status === 2 && response.errors!=''){
                    swal("Error", response.errors,"error");
                }
            })
            .catch((error) => {
                //console.log('Error', error);
                swal("Error", error, "error");
        });
    };
    //console.log(cityList[0].name);
    return (
        <>
            <section className="delivery-boy-panel">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-md-pull-6">
                            <div className="login-box">
                                <h1>Add New Delivery Boy</h1>
                                <Formik

                        initialValues={{
                            firstName: '',
                            lastName: '',
                            email:'',
                            dob:'',
                            primary_phone_no:'',
                            address:'',
                            city:'',
                            pincode:'',
                            file: null,
                        }}

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
                         console.log(values);
                          submitHandler(values);
                           resetForm({ values: '' });
                        }}
                    >
                        {({ errors,touched,setFieldValue}) => (

                                <Form>
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
                                            type="text"
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
                                    <Field as="select" name="city" id="city" className="form-control">
                                    <option value="">Select City</option>
                                    {cityList.map((value, key) => {
                                        return (
                                        <option value={value.id}>
                                            {value.name}
                                        </option>
                                        );
                                    })}
                                   
                                    </Field>
                                    {touched.city && errors.city && <div className="form-error">{errors.city}</div>}
                                    </div>
                                    <div className="form-group">
                                    <Field
                                            type="text"
                                            name="pincode"
                                            className="form-control mb-2"
                                            id="pincode"
                                            placeholder="Pincode"
                                        />
                                        {touched.pincode && errors.pincode && <div className="form-error">{errors.pincode}</div>}
                                    </div>

                                    <div className="form-group">
                                    <input
                                        type="file"
                                        id="file"
                                        name="file"
                                        onChange={(event) => {
                                        setFieldValue('file', event.currentTarget.files[0]);
                                        }}
                                    />
                                        
                                    </div>
                                   
                                    <button type="submit" className="btn btn-default">SAVE</button>
                                </Form>
                                 )}
                                 </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default NewDeliveryBoy;