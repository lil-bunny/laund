import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    const logoutHandler = () =>{
        localStorage.removeItem('login');
    }
    
    return (
        <>
            <nav className="main-header navbar navbar-expand">
                <ul className="navbar-nav ml-auto ms-auto">
                    <li className="nav-item dropdown">
                        <NavLink to='#' className="nav-link" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="./assets/images/Doorbell.png" alt="doorbell" />
                            <span className="badge badge-danger navbar-badge">100</span>
                        </NavLink>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            Dropdown Content
                        </div>
                    </li>

                    <li className="nav-item dropdown profile-dropdown">
                        <NavLink to='#' className="nav-link" data-bs-toggle="dropdown" aria-expanded="false">
                            <span className="profile-image"></span>
                            <img src="./assets/images/sort-down-white.png" alt="doorbell" />
                        </NavLink>
                        <div onClick={logoutHandler} className="dropdown-menu">
                            Logout
                        </div>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Header;
