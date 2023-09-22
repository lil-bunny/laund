import React from 'react';
import ManageSubCategoryPage from '@component/components/category/ManageSubCategories';

const ManageSubCategory = () => {
  return <ManageSubCategoryPage />
}

export async function getServerSideProps(context) {
  return {
    props: {
      layout:'MainLayout'
    }, 
  }
}

export default ManageSubCategory