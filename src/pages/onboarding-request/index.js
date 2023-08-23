import React from 'react';
import OnboardingPage from '@component/components/onboarding-request/Onboarding';

const Onboarding = () => {
  return <OnboardingPage />
}

export async function getServerSideProps(context) {
  return {
    props: {
      layout:'MainLayout'
    }, 
  }
}

export default Onboarding