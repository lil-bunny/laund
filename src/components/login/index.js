import React, { useEffect } from "react";
import { Form, Formik, Field } from 'formik';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import swal from "sweetalert";
import * as yup from "yup";
import axios from "axios";
import apiurl from "@component/api/apiconfig";

const Login = () => {
    const router = useRouter();
    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            let token = localStorage.getItem('token');
            if(token){
                router.push('/dashboard')
            }
        }
    },[])
    
    const loginHandler = (values) => {
        axios.post(apiurl+'auth/login', values)
            .then((response) => {
                if (response.data.status === 1) {
                    localStorage.setItem('token', response.data.token);
                    router.push('/dashboard')
                }else if(response.data.status === 2){
                    swal("Error", 'Invalid user name or password', "error");
                }
            })
            .catch((error) => {
                console.log('Error', error);
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
                                            })
                                    }
                                    onSubmit={(values, { resetForm }) => {
                                        loginHandler(values);
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
                                                <Link href="#">Forgot Password</Link>
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