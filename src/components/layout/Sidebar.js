import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = (props) => {
    return (
        <>
            <section className="main-sidebar">
                <div className="main-logo">
                    <NavLink to='/' className="brand-link">
                        <img src="./assets/images/logo.png" alt="Logo" className="brand-image" />
                    </NavLink>
                </div>
                <div className="sidebar-menu">
                    <ul>
                        <li activeclassname="active" className="nav-item">
                            <NavLink to='/' className="menu-link">
                                <img src="./assets/images/Speed.png" alt="menu-img" />
                                <span className="menu-name">Dashboard</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/order' className="menu-link">
                                <img src="./assets/images/Purchase-Order.png" alt="menu-img" />
                                <span className="menu-name">Orders</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/delivery-boy' className="menu-link">
                                <img src="./assets/images/Businessman.png" alt="menu-img" />
                                <span className="menu-name">Delivery Boys</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/helper' className="menu-link">
                                <img src="./assets/images/Supplier.png" alt="menu-img" />
                                <span className="menu-name">Helpers</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/laundry' className="menu-link">
                                <img src="./assets/images/Washing-Machine.png" alt="menu-img" />
                                <span className="menu-name">Laundries</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/customer' className="menu-link">
                                <img src="./assets/images/Management.png" alt="menu-img" />
                                <span className="menu-name">Customers</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/payment' className="menu-link">
                                <img src="./assets/images/Buy-With-Card.png" alt="menu-img" />
                                <span className="menu-name">Payments</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/location' className="menu-link">
                                <img src="./assets/images/Place-Marker.png" alt="menu-img" />
                                <span className="menu-name">Location</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </section>
        </>
    );
};

export default Sidebar;
