import React from 'react';
import OrderDetailsPage from '@component/components/orders/OrderDetails';

const OrderDetails = () => {
  return <OrderDetailsPage />
}

export async function getServerSideProps(context) {
    return {
      props: {
        layout:'MainLayout'
      }, 
    }
  }

export default OrderDetails;