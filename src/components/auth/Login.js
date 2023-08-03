import React,{ useContext } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import AuthContext from "../../store/auth-context";
import { Form, Formik, Field } from 'formik';
import swal from "sweetalert";
import * as yup from "yup";
import axios from "axios";
import apiurl from "../../api/apiconfig";
const Login = () => {
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);
   // console.log(authCtx.initialToken);
    const loginHandler = (values) => {
       // console.log(values);
        axios.post(apiurl+'admin-login', values)
            .then((response) => {
               // console.log(response);
                if (response.data.status === 1 && response.data.token != '') {
                     
                     
                      authCtx.loginData(response.data);
                      authCtx.login(response.data.token);
                      //swal("success", response.data.token, "success");
                      navigate('/');
                }
                else if(response.data.status === 2){
                    swal("Error", 'Invalid user name or password', "error");
                }
            })
            .catch((error) => {
                //console.log('Error', error);
                swal("Error", 'Invalid user name or password', "error");
        });
    };
    
    return (
        <>
            <section className="login-panel">
                <img src="./assets/images/login-logo.png" alt="logo" />
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 offset-md-4">
                            <div className="login-box">
                                <h1>LOGIN</h1>
                                <Formik
                        initialValues={{
                            username: '',
                            password: '',
                        }}

                        validationSchema={
                            yup.object().shape({
                                username: yup.string().required("User name is required"),
                                password: yup
                                .string()
                                .required("Password is required")
                                // .min(8, 'Password must be 8 characters long')
                                // .matches(/[0-9]/, 'Password requires a number')
                                // .matches(/[a-z]/, 'Password requires a lowercase letter')
                                // .matches(/[A-Z]/, 'Password requires an uppercase letter')
                                // .matches(/[^\w]/, 'Password requires a symbol'),
                            })
                        }
                        onSubmit={(values, { resetForm }) => {
                            loginHandler(values);
                           // resetForm({ values: '' });
                        }}
                    >
                        {({ errors, touched }) => (

                                <Form>
                                    <div className="form-group">
                                    <Field
                                            type="text"
                                            name="username"
                                            className="form-control mb-2"
                                            id="username"
                                            placeholder="Enter user name or mobile number"
                                        />
                                        {touched.username && errors.username && <div className="form-error">{errors.username}</div>}
                                    </div>
                                    <div className="form-group">
                                    <Field
                                            type="password"
                                            name="password"
                                            className="form-control mb-2"
                                            id="password"
                                            placeholder="Enter password"
                                        />
                                        {touched.password && errors.password && <div className="form-error">{errors.password}</div>}
                                    </div>
                                    <div className="login-footer">
                                        <div className="checkbox">
                                            <label><input type="checkbox" name="remember" /> Remember me</label>
                                        </div>
                                        <NavLink to="#">Forgot Password</NavLink>
                                    </div>
                                    <button type="submit" className="btn btn-default">LOGIN</button>
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

export default Login;