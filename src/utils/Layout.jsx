import { Outlet, useLocation } from 'react-router-dom'
import Footer from '@components/Footer'
import Navbar from '@components/Navbar'

const Layout = () => {
  const location = useLocation()
  const isDashboard =
    location.pathname.startsWith('/host') ||
    location.pathname.startsWith('/user')

  return (
    <>
      {!isDashboard && <Navbar />}
      <Outlet />
      {!isDashboard && <Footer />}
    </>
  )
}

export default Layout
