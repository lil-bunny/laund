import React from 'react';
import SettingsPage from '@component/components/settings/setting';

const settings = () => {
  return <SettingsPage />
}

export async function getServerSideProps(context) {
  return {
    props: {
      layout:'MainLayout'
    }, 
  }
}

export default settings