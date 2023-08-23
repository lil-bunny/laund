import React from 'react';
import LaundryPage from '@component/components/laundries/Laundry';

const laundry = () => {
  return <LaundryPage/>
}

export async function getServerSideProps(context) {
  return {
    props: {
      layout:'MainLayout'
    }, 
  }
}
export default laundry;