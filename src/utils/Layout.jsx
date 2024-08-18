import Footer from '@components/Footer'
import Navbar from '@components/Navbar'
import { Toaster } from 'react-hot-toast'
import { Outlet, useLocation } from 'react-router-dom'

const Layout = () => {
  const location = useLocation()
  const isRegistration = location.pathname.startsWith('/registration')
  const isDashboard =
    location.pathname.startsWith('/host') ||
    location.pathname.startsWith('/user')

  return (
    <>
      {!(isDashboard || isRegistration) && <Navbar />}
      <Outlet />
      {!(isDashboard || isRegistration) && <Footer />}
      <Toaster position='bottom-right' reverseOrder={false} />
    </>
  )
}

export default Layout
