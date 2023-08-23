import React from 'react';
import LaundryDetailsPage from '@component/components/laundries/LaundryDetails';

const LaundryDetails = () => {
  return <LaundryDetailsPage />
}

export async function getServerSideProps(context) {
  return {
    props: {
      layout:'MainLayout'
    }, 
  }
}


export default LaundryDetails;