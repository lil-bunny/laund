import React from 'react';
import ManageCategoryPage from '@component/components/category/ManageCategories';

const ManageCategory = () => {
  return <ManageCategoryPage />
}

export async function getServerSideProps(context) {
  return {
    props: {
      layout:'MainLayout'
    }, 
  }
}

export default ManageCategory