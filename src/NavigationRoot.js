import React from 'react';
import './index.css';
import StationList, {
  loader as rootLoader,
} from "./rivers/StationList";
import ErrorPage from './errors/ErrorPage';
import Station, {
  loader as stationLoader,
} from './rivers/Station';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Summary from "./contacts/Summary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StationList />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Summary /> },
          {
            path: "station/:stationid",
            element: <Station />,
            loader: stationLoader,
          },
        ]
      }
    ]    
  }
]);

const NavigationRoot = () => (
  <RouterProvider router={router} />
);

export default NavigationRoot;