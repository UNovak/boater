import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import Layout from "./Layout";
import LandingPage from "@pages/LandingPage";
import Host from "@pages/Host";
import Registration from "@pages/Registration";
import Listing from "@pages/Listing";
import Renter from "@pages/Renter";

// router for handling the navigation accross the App

export const ProtectedRoutes = () => {
  const authStatus = true;

  return !authStatus ? <Navigate to={"/"} /> : <Outlet />;
};

export const mainRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<LandingPage />} />
      <Route path="registration" element={<Registration />} />
      <Route path="host" element={<ProtectedRoutes />}>
        <Route path="" element={<Host />} />
      </Route>
      <Route path="renter" element={<ProtectedRoutes />}>
        <Route path="listing" element={<Listing />} />
        <Route path="" element={<Renter />} />
      </Route>
    </Route>,
  ),
);
