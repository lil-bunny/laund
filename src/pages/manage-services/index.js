import React from 'react';
import ManageServicesPage from '@component/components/services/ManageServices';

const ManageServices = () => {
  return <ManageServicesPage />
}

export async function getServerSideProps(context) {
  return {
    props: {
      layout:'MainLayout'
    }, 
  }
}

export default ManageServices