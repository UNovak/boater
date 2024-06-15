import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
} from "react-router-dom";
import Host from "@pages/Host";
import LandingPage from "@pages/LandingPage";
import Layout from "./Layout";
import Listing from "@pages/Listing";
import ListingEditor from "@pages/ListingEditor";
import Registration from "@pages/Registration";
import Renter from "@pages/Renter";
import useStore from "./Store";

// router for handling the navigation accross the App

export const ProtectedRoutes = () => {
  const authStatus = useStore((state) => state.session.authenticated);

  return !authStatus ? <Navigate to={"/"} /> : <Outlet />;
};

export const mainRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<LandingPage />} />
      <Route path="registration" element={<Registration />} />
      <Route path="listing/:boat_id" element={<Listing />} />
      <Route path="host" element={<ProtectedRoutes />}>
        <Route path=":id" element={<Host />} />
        <Route path="listing/create" element={<ListingEditor type={"new"} />} />
      </Route>
      <Route path="renter" element={<ProtectedRoutes />}>
        <Route path="" element={<Renter />} />
      </Route>
    </Route>,
  ),
);
