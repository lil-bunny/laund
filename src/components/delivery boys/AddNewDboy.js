import React, { useContext,useState,useEffect} from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import AuthContext from "../../store/auth-context";
import { Form, Formik, Field } from 'formik';
import swal from "sweetalert";
import * as yup from "yup";
import axiosInstance from "../../api/axiosinstance";
import apiurl from "../../api/apiconfig";
let id='1';
const AddNewDboy = () => {
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    const [cityList, setDataCity] = useState([]);
    // const [file, setFile] = useState(null);
    // const handleFileChange = (event) => {
    //     setFile(event.target.files[0]);
    //   };
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
 
    const submitHandler = (values,files) => {
   
       axiosInstance.post(apiurl+'add-laundry-associate', values,files)
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
                swal("Error", 'Something went wrong! Please try again later.', "error");
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
                          // console.log(values,file);
                            submitHandler(values);
                            resetForm({ values: '' });
                        }}
                    >
                        {({ errors, touched }) => (

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

export default AddNewDboy;