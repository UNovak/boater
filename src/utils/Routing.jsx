import Dashboard from '@pages/Dashboard'
import Account from '@pages/dashboard/Account'
import Host from '@pages/dashboard/Host'
import Inbox from '@pages/dashboard/Inbox'
import Settings from '@pages/dashboard/Settings'
import User from '@pages/dashboard/User'
import Faq from '@pages/Faq'
import LandingPage from '@pages/LandingPage'
import Listing from '@pages/Listing'
import ListingEditor from '@pages/ListingEditor'
import Registration from '@pages/Registration'
import { useEffect, useState } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  useLocation,
} from 'react-router-dom'
import Layout from './Layout'
import useStore from './Store'

// router for handling the navigation accross the App
const ProtectedRoutes = ({ condition }) => {
  const authStatus = useStore((state) => state.session.authenticated)
  const hostRole = useStore((state) => state.user.host)
  const registered = useStore((state) => state.user.registration_complete)
  const [checking, setChecking] = useState(true)
  const location = useLocation()

  useEffect(() => {
    if (authStatus !== undefined && registered !== undefined) {
      setChecking(false)
    }
  }, [registered, authStatus])

  if (authStatus && checking) return <>Loading...</>

  if (authStatus && !registered) {
    if (location.pathname.startsWith('/registration')) return
    return <Navigate to={'/registration'} />
  }

  if (condition === 'no_host') {
    if (hostRole) return <Navigate to={'/host'} />
    return <Outlet />
  }

  if (condition === 'host' && authStatus) {
    if (!hostRole) {
      return
    }
    return <Outlet />
  }

  if (condition === 'user' && authStatus) {
    if (hostRole) {
      return
    }
    return <Outlet />
  }

  return !authStatus ? <Navigate to={'/'} /> : <Outlet />
}

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='faq' element={<Faq />} />
      <Route path='profile/:email' element={<Account mode={'public'} />} />
      <Route path='registration' element={<Registration />} />
      <Route element={<ProtectedRoutes condition='no_host' />}>
        <Route index element={<LandingPage />} />
        <Route path='listing/:boat_id' element={<Listing />} />
      </Route>
      <Route element={<ProtectedRoutes condition='host' />}>
        <Route path='host' element={<Dashboard />}>
          <Route path='' element={<Host />} />
          <Route path='settings' element={<Settings mode={'host'} />} />
          <Route path='inbox' element={<Inbox mode={'host'} />} />
          <Route path='account' element={<Account mode={'host'} />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoutes condition='user' />}>
        <Route path='user' element={<Dashboard />}>
          <Route path='' element={<User />} />
          <Route path='settings' element={<Settings mode={'user'} />} />
          <Route path='inbox' element={<Inbox mode={'user'} />} />
          <Route path='account' element={<Account mode={'user'} />} />
        </Route>
      </Route>
      {/* protected routes that handle boats */}
      <Route element={<ProtectedRoutes condition='host' />}>
        <Route path='create' element={<ListingEditor type={'new'} />} />
        <Route path='edit' element={<ListingEditor type={'edit'} />} />
      </Route>
    </Route>,
  ),
)

export default Router
