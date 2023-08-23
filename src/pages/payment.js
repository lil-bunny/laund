import React from 'react';
import PaymentPage from '@component/components/payments/Payment';

const payment = () => {
  return <PaymentPage />
}

export async function getServerSideProps(context) {
  return {
    props: {
      layout:'MainLayout'
    }, 
  }
}

export default payment;