import React from 'react';
import DeliveryBoyDetailsPage from '@component/components/delivery-boys/DeliveryBoyDetails';

const DeliveryBoyDetails = () => {
  return <DeliveryBoyDetailsPage />
}

export async function getServerSideProps(context) {
  return {
    props: {
      layout:'MainLayout'
    }, 
  }
}

export default DeliveryBoyDetails;