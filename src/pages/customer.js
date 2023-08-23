import React from 'react';
import CustomerPage from '@component/components/customers/Customer';

const customer = () => {
  return <CustomerPage />
}

export async function getServerSideProps(context) {
  return {
    props: {
      layout:'MainLayout'
    }, 
  }
}

export default customer