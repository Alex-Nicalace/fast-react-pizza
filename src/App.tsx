import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./ui/Home";
import Menu from "./features/menu/Menu";
import { loader as loaderMenu } from "./features/menu/loader";
import { loader as loaderOrder } from "./features/order/loader";
import { action as actionCreateOrder } from "./features/order/CreateOrder/action";
import Cart from "./features/cart/Cart";
import Order from "./features/order/Order";
import CreateOrder from "./features/order/CreateOrder/CreateOrder";
import AppLayout from "./ui/AppLayout";
import ErrorMessage from "./ui/ErrorMessage";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorMessage />,
    path: "/",
    children: [
      {
        errorElement: <ErrorMessage />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "/menu",
            element: <Menu />,
            loader: loaderMenu,
          },
          {
            path: "/cart",
            element: <Cart />,
          },
          {
            path: "/order/new",
            element: <CreateOrder />,
            action: actionCreateOrder,
          },
          {
            path: "/order/:orederId",
            element: <Order />,
            loader: loaderOrder,
          },
        ],
      },
    ],
  },
]);

// interface IAppProps {}
function App(): JSX.Element {
  return <RouterProvider router={router} />;
}

export default App;
