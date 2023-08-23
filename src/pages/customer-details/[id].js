import React from 'react';
import CustomerDetailsPage from '@component/components/customers/CustomerDetails';

const CustomerDetails = () => {
  return <CustomerDetailsPage />
}

export async function getServerSideProps(context) {
  return {
    props: {
      layout:'MainLayout'
    }, 
  }
}
export default CustomerDetails;