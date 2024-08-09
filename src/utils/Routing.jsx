import Dashboard from '@pages/Dashboard'
import Account from '@pages/dashboard/Account'
import Host from '@pages/dashboard/Host'
import Inbox from '@pages/dashboard/Inbox'
import Settings from '@pages/dashboard/Settings'
import User from '@pages/dashboard/User'
import LandingPage from '@pages/LandingPage'
import Listing from '@pages/Listing'
import ListingEditor from '@pages/ListingEditor'
import Registration from '@pages/Registration'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
} from 'react-router-dom'
import Layout from './Layout'
import useStore from './Store'

// router for handling the navigation accross the App
export const ProtectedRoutes = ({ condition }) => {
  const authStatus = useStore((state) => state.session.authenticated)
  const hostRole = useStore((state) => state.user.host)

  if (condition === 'no_host') {
    if (hostRole) return <Navigate to={'/host'} />
    return <Outlet />
  }

  if (condition === 'host' && authStatus) {
    if (!hostRole) {
      console.log('access denied need host')
      return
    }
    return <Outlet />
  }

  if (condition === 'user' && authStatus) {
    if (hostRole) {
      console.log('access denied need user')
      return
    }
    return <Outlet />
  }

  return !authStatus ? <Navigate to={'/'} /> : <Outlet />
}

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='profile/:email' element={<Account mode={'public'} />} />
      <Route element={<ProtectedRoutes condition='no_host' />}>
        <Route index element={<LandingPage />} />
        <Route path='registration' element={<Registration />} />
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
