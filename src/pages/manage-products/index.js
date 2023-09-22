import React from 'react';
import ManageProductsPage from '@component/components/products/manage-products';

const ManageProducts = () => {
  return <ManageProductsPage />
}

export async function getServerSideProps(context) {
  return {
    props: {
      layout:'MainLayout'
    }, 
  }
}

export default ManageProducts