import React from 'react';
import OrderPage from '@component/components/orders/Order';

const Order = () => {
  return <OrderPage />
}

export async function getServerSideProps(context) {
    return {
      props: {
        layout:'MainLayout'
      }, 
    }
  }

export default Order;