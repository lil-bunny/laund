import React from 'react';
import HelperDetailsPage from '@component/components/helpers/HelperDetails';

const HelperDetails = () => {
  return <HelperDetailsPage />
}

export async function getServerSideProps(context) {
    return {
      props: {
        layout:'MainLayout'
      }, 
    }
  }

export default HelperDetails