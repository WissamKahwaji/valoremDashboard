import React, { Suspense, lazy } from "react";
import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import LoadingPage from "./pages/loadingPage/LoadingPage";
import AboutUs from "./pages/aboutUs";
import ContactUs from "./pages/contactUs";
import Properties from "./pages/properties";
import OurServices from "./pages/ourServices/OurServices";
import AddServicePage from "./pages/ourServices/AddServicePage";
import ServiceDetails from "./pages/ourServices/ServiceDetails";
import AddProperty from "./pages/properties/AddProperty";
import PropertyDetails from "./pages/properties/PropertyDetails";
import UnAuthorized from "./pages/unAuthorized";
import SignInPage from "./pages/signin";

const Routes = () => {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route
          path="/"
          element={localStorage.getItem("token") ? <App /> : <UnAuthorized />}
        >
          <Route path="properties" element={<Properties />}></Route>
          <Route path="properties/:id" element={<PropertyDetails />}></Route>
          <Route path="add-property" element={<AddProperty />}></Route>
          <Route path="services" element={<OurServices />}></Route>
          <Route path="add-service" element={<AddServicePage />}></Route>
          <Route path="service/:id" element={<ServiceDetails />}></Route>
          <Route path="contact" element={<ContactUs />}></Route>
          <Route path="about-us" element={<AboutUs />}></Route>
        </Route>
        <Route path="/sign-in" element={<SignInPage />} />
      </Route>
    )
  );
  return (
    <Suspense fallback={<LoadingPage />}>
      <RouterProvider router={routes} />
    </Suspense>
  );
};

export default Routes;
