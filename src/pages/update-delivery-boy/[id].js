import React from 'react';
import DeliveryBoyUpdatePage from '@component/components/delivery-boys/DeliveryBoyUpdate';

const UpdateDeliveryBoy = () => {
  return <DeliveryBoyUpdatePage />
}

export async function getServerSideProps(context) {
  return {
    props: {
      layout:'MainLayout'
    }, 
  }
}

export default UpdateDeliveryBoy;