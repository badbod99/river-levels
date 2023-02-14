import React from 'react';
import './index.css';
import ContactList, {
  loader as rootLoader,
  action as rootAction,
} from "./contacts/ContactList";
import ErrorPage from './errors/ErrorPage';
import Contact, {
  loader as contactLoader,
  action as contactAction,
} from './contacts/Contact';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import EditContact, {
  action as editAction,
} from "./contacts/EditContact";
import { action as destroyAction } from "./contacts/DeleteContact";
import Summary from "./contacts/Summary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ContactList />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Summary /> },
          {
            path: "contacts/:contactId",
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          },
          {
            path: "contacts/:contactId/edit",
            element: <EditContact />,
            loader: contactLoader,
            action: editAction,
          },
          {
            path: "contacts/:contactId/destroy",
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>,
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