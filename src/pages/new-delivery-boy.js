import React from 'react';
import NewDeliveryBoyPage from '@component/components/delivery-boys/NewDeliveryBoy'

const NewDeliveryBoy = () => {
  return <NewDeliveryBoyPage />
}

export async function getServerSideProps(context) {
  return {
    props: {
      layout:'MainLayout'
    }, 
  }
}

export default NewDeliveryBoy;