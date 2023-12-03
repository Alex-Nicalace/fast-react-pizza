import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './index.css';
import Home from './ui/Home';
import Menu from './features/menu/Menu';
import { loader as loaderMenu } from './features/menu/loader';
import { loader as loaderOrder } from './features/order/loader';
import Cart from './features/cart/Cart';
import Order from './features/order/Order';
import CreateOrder from './features/order/CreateOrder';
import AppLayout from './ui/AppLayout';
import ErrorMessage from './ui/ErrorMessage';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorMessage />,
    path: '/',
    children: [
      {
        errorElement: <ErrorMessage />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: '/menu',
            element: <Menu />,
            loader: loaderMenu,
          },
          {
            path: '/cart',
            element: <Cart />,
          },
          {
            path: '/order/new',
            element: <CreateOrder />,
          },
          {
            path: '/order/:orederId',
            element: <Order />,
            loader: loaderOrder,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
