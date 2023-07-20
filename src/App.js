import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Layout from './components/layout/Layout';
import AuthLayout from './components/auth/AuthLayout';
import Dashboard from './components/home/Dashboard';
import Login from './components/auth/Login';
import Notification from './components/notifications/Notification';
import Order from './components/orders/Order';
import OrderDetails from './components/orders/OrderDetails';
import DeliveryBoy from './components/delivery boys/DeliveryBoy';
import DeliveryBoyDetails from './components/delivery boys/DeliveryBoyDetails';
import Helper from './components/helpers/Helper';
import HelperDetails from './components/helpers/HelperDetails';
import Laundry from './components/laundries/Laundry';
import LaundryDetails from './components/laundries/LaundryDetails';
import Customer from './components/customers/Customer';
import CustomerDetails from './components/customers/CustomerDetails';
import Payment from './components/payments/Payment';
import Onboarding from './components/onboarding request/Onboarding';
import Location from './components/location/Location';
import './App.css';

const App = () => {
  const isLoggedIn = localStorage.getItem('login');

  if (isLoggedIn) {
    return (
      <Layout>
        <Routes>
          <Route path='*' element={<Navigate replace to='/' />} />
          <Route path='/' element={<Dashboard />} />
          <Route path='/notification' element={<Notification />} />
          <Route path='/order' element={<Order />} />
          <Route path='/order-details' element={<OrderDetails />} />
          <Route path='/delivery-boy' element={<DeliveryBoy />} />
          <Route path='/delivery-boy-details' element={<DeliveryBoyDetails />} />
          <Route path='/helper' element={<Helper />} />
          <Route path='/helper-details' element={<HelperDetails />} />
          <Route path='/laundry' element={<Laundry />} />
          <Route path='/laundry-details' element={<LaundryDetails />} />
          <Route path='/customer' element={<Customer />} />
          <Route path='/customer-details' element={<CustomerDetails />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/onboarding' element={<Onboarding />} />
          <Route path='/location' element={<Location />} />
        </Routes>
      </Layout>
    );
  } else {
    return (
      <AuthLayout>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Navigate replace to='/login' />} />
        </Routes>
      </AuthLayout >
    )
  }
}

export default App;
