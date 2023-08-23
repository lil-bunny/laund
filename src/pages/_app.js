import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import MainLayout from '@component/components/layout/MainLayout';
import AuthLayout from '@component/components/layout/AuthLayout';
import { AuthGuard } from '@component/utils/authGuard';

import '@component/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(fas, fab);
export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => {
        setLoading(true);
    };

    const handleComplete = () => {
        setLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
        router.events.off('routeChangeStart', handleStart);
        router.events.off('routeChangeComplete', handleComplete);
        router.events.off('routeChangeError', handleComplete);
    };
}, [router]);
  
  const layoutName = pageProps.layout ?? 'AuthLayout'
  if (layoutName === "AuthLayout") {
    return (
      <>
      {loading ? 
        <div className="loading-indicator">Loading...</div> :
        <AuthLayout>
          <Component {...pageProps} />
        </AuthLayout>
      }
      </>
      
    )
  }else if(layoutName === "MainLayout") {
    return (
        <>
        {loading ? 
          <div className="loading-indicator">Loading...</div> :
          <AuthGuard>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </AuthGuard> }
        </>
    )
  } 

}

