import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./Layout";
import LandingPage from "@pages/LandingPage";
import Host from "@pages/Host";
import Registration from "@pages/Registration";
import Listing from "@pages/Listing";
import Renter from "@pages/Renter";

// router for handling the navigation accross the App
export const mainRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<LandingPage />} />
      <Route path="host" element={<Host />} />
      <Route path="registration" element={<Registration />} />
      <Route path="listing" element={<Listing />} />
      <Route path="renter" element={<Renter />} />
    </Route>,
  ),
);
