import React from 'react';
import DeliveryBoyPage from '@component/components/delivery-boys/DeliveryBoy'

const DeliveryBoy = () => {
  return <DeliveryBoyPage />
}

export async function getServerSideProps(context) {
  return {
    props: {
      layout:'MainLayout'
    }, 
  }
}

export default DeliveryBoy;