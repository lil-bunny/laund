import React from 'react';
import PaginatePage from '@component/components/paginate/paginate';

const Paginate = () => {
  return <PaginatePage />
}

export async function getServerSideProps(context) {
  return {
    props: {
      layout:'MainLayout'
    }, 
  }
}

export default Paginate