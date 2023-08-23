import React from 'react';
import Dashboardpage from '@component/components/dashboard';

const Dashboard = () => {
  return <Dashboardpage />
}

export async function getServerSideProps(context) {
  return {
    props: {
      layout:'MainLayout'
    }, 
  }
}

export default Dashboard;