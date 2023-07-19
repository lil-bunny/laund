import React from "react";
import { NavLink } from 'react-router-dom';

const Login = () => {
    const loginSubmitHandler = () =>{
        localStorage.setItem('login', true);
    }
    
    return (
        <>
            <section className="login-panel">
                <img src="./assets/images/login-logo.png" alt="logo" />
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 offset-md-4">
                            <div className="login-box">
                                <h1>LOGIN</h1>
                                <form action="/action_page.php">
                                    <div className="form-group">
                                        <input type="email" className="form-control mb-4" id="email" placeholder="Enter email or mobile number" name="email" />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pwd" />
                                    </div>
                                    <div className="login-footer">
                                        <div className="checkbox">
                                            <label><input type="checkbox" name="remember" /> Remember me</label>
                                        </div>
                                        <NavLink to="#">Forgot Password</NavLink>
                                    </div>
                                    <button type="submit" onClick={loginSubmitHandler} className="btn btn-default">LOGIN</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login;