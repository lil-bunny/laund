import React from 'react';
import Link from 'next/link';
import { imagepath } from '@component/functions/commonfunction';
import { useRouter } from 'next/router';
const Sidebar = (props) => {
    let imageLocation=imagepath();
    const router = useRouter();
    return (
        <>
            <section className="main-sidebar">
                <div className="main-logo">
                    <Link href="#" className="brand-link">
                        <img src="/assets/images/logo.png" alt="Logo" className="brand-image" />
                    </Link>
                </div>
                <div className="sidebar-menu">
                    <ul>
                        <li className={router.pathname == "/dashboard" ? "nav-item active" : "nav-item"}>
                            <Link href='/dashboard' className="menu-link">
                                <img src="/assets/images/speed.png" alt="menu-img" />
                                <span className="menu-name">Dashboard</span>
                            </Link>
                        </li>
                        <li className={router.pathname == "/order" ? "nav-item active" : "nav-item"}>
                            <Link href='/order' className="menu-link">
                                <img src="/assets/images/purchase-order.png" alt="menu-img" />
                                <span className="menu-name">Orders</span>
                            </Link>
                        </li>
                        <li className={router.pathname == "/delivery-boy" ? "nav-item active" : "nav-item"}>
                            <Link href='/delivery-boy' className="menu-link">
                                <img src="/assets/images/businessman.png" alt="menu-img" />
                                <span className="menu-name">Delivery Boys</span>
                            </Link>
                        </li>
                        <li className={router.pathname == "/helper" ? "nav-item active" : "nav-item"}>
                            <Link href='/helper' className="menu-link">
                                <img src="/assets/images/supplier.png" alt="menu-img" />
                                <span className="menu-name">Helpers</span>
                            </Link>
                        </li>
                        <li className={router.pathname == "/laundry" ? "nav-item active" : "nav-item"}>
                            <Link href='/laundry' className="menu-link">
                                <img src="/assets/images/washing-machine.png" alt="menu-img" />
                                <span className="menu-name">Laundries</span>
                            </Link>
                        </li>
                        <li className={router.pathname == "/customer" ? "nav-item active" : "nav-item"}>
                            <Link href='/customer' className="menu-link">
                                <img src={imageLocation+'management.png'} alt="menu-img" />
                                <span className="menu-name">Customers</span>
                            </Link>
                        </li>
                        <li className={router.pathname == "/onboarding-request" ? "nav-item active" : "nav-item"}>
                            <Link href='/onboarding-request' className="menu-link">
                                <img src={imageLocation+'management.png'} alt="menu-img" />
                                <span className="menu-name">Onboarding Request</span>
                            </Link>
                        </li>
                        <li className={router.pathname == "/payment" ? "nav-item active" : "nav-item"}>
                            <Link href='/payment' className="menu-link">
                                <img src="/assets/images/buy-with-card.png" alt="menu-img" />
                                <span className="menu-name">Payments</span>
                            </Link>
                        </li>
                        <li className={router.pathname == "/manage-services" ? "nav-item active" : "nav-item"}>
                            <Link href='/manage-services' className="menu-link">
                                <img src="/assets/images/purchase-order.png" alt="menu-img" />
                                <span className="menu-name">Manage Services</span>
                            </Link>
                        </li>
                        
                        <li className={router.pathname == "/location" ? "nav-item active" : "nav-item"}>
                            <Link href='/location' className="menu-link">
                                <img src="/assets/images/place-marker.png" alt="menu-img" />
                                <span className="menu-name">Location</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </section>
        </>
    );
};

export default Sidebar;
