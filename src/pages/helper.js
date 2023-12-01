import React from 'react';
import HelperPage from '@component/components/helpers/Helper';

const helper = () => {
  return <HelperPage />
}

export async function getServerSideProps(context) {
  return {
    props: {
      layout:'MainLayout'
    }, 
  }
}

export default helper