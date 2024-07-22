import Dashboard from '@pages/Dashboard'
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

  console.log('routing protocol: ', authStatus, hostRole)

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
      <Route element={<ProtectedRoutes condition='no_host' />}>
        <Route index element={<LandingPage />} />
        <Route path='registration' element={<Registration />} />
        <Route path='listing/:boat_id' element={<Listing />} />
      </Route>
      <Route element={<ProtectedRoutes condition='host' />}>
        <Route path='host' element={<Dashboard />}>
          <Route path='settings' element={<Dashboard />} />
          <Route path='inbox' element={<Dashboard />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoutes condition='user' />}>
        <Route path='user' element={<Dashboard />}>
          <Route path='settings' element={<Dashboard />} />
          <Route path='inbox' element={<Dashboard />} />
        </Route>
      </Route>
      {/* protected routes that handle boats */}
      <Route element={<ProtectedRoutes />}>
        <Route path='create' element={<ListingEditor type={'new'} />} />
        <Route path='edit' element={<ListingEditor type={'edit'} />} />
      </Route>
    </Route>,
  ),
)
