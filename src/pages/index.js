import LoginPage from '@component/components/login'

export default function Home() {
  return <LoginPage />
}

export async function getServerSideProps(context) {
  return {
    props: {
      layout:'AuthLayout'
    }, 
  }
}


