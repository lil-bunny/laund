import React from "react";
import { NavLink } from 'react-router-dom';

const Register = () => {
    return (
        <div className="">
            <div className="register-box">
                <div className="register-logo">
                    <NavLink to="#"><b></b>Register</NavLink>
                </div>

                <div className="card">
                    <div className="card-body register-card-body">
                        <p className="login-box-msg">Register a new membership</p>

                        <form action="" method="post">
                            <div className="form-group has-feedback">
                                <input type="text" className="form-control" placeholder="Full name" />
                                <span className="fa fa-user form-control-feedback"></span>
                            </div>
                            <div className="form-group has-feedback">
                                <input type="email" className="form-control" placeholder="Email" />
                                <span className="fa fa-envelope form-control-feedback"></span>
                            </div>
                            <div className="form-group has-feedback">
                                <input type="password" className="form-control" placeholder="Password" />
                                <span className="fa fa-lock form-control-feedback"></span>
                            </div>
                            <div className="form-group has-feedback">
                                <input type="password" className="form-control" placeholder="Retype password" />
                                <span className="fa fa-lock form-control-feedback"></span>
                            </div>
                            <div className="row">
                                <div className="col-8">
                                    <div className="checkbox icheck">
                                        <label>
                                            <input type="checkbox" /> I agree to the <NavLink to="#">terms</NavLink>
                                        </label>
                                    </div>
                                </div>

                                <div className="col-4">
                                    <button type="submit" className="btn btn-primary btn-block btn-flat">Register</button>
                                </div>

                            </div>
                        </form>

                        <div className="social-auth-links text-center">
                            <p>- OR -</p>
                            <NavLink to="#" className="btn btn-block btn-primary">
                                <i className="fa fa-facebook mr-2"></i>
                                Sign up using Facebook
                            </NavLink>
                            <NavLink to="#" className="btn btn-block btn-danger">
                                <i className="fa fa-google-plus mr-2"></i>
                                Sign up using Google+
                            </NavLink>
                        </div>

                        <NavLink to="#" className="text-center">I already have a membership</NavLink>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Register;