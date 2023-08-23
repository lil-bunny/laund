import React from 'react';
import LocationPage from '@component/components/location';

const location = () => {
  return <LocationPage />
}

export async function getServerSideProps(context) {
    return {
      props: {
        layout:'MainLayout'
      }, 
    }
  }

export default location;