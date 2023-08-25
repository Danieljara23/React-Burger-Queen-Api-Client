import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./App.css";
import Layout from "./Pages/Layout";
import { PATHNAMES } from "./Services/RouteService";
import { ProtectedRoute } from "./Routes/ProtectedRoute";
import Home from "./Pages/Home";
import Waiter from "./Pages/Waiter";
import Admin from "./Pages/Admin";
import Login from "./Pages/Login";

const ROUTES: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: PATHNAMES.LOGIN,
        element: <Login />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: PATHNAMES.HOME,
            element: <Home />,
          },
          {
            path: PATHNAMES.ORDERS,
            children: [
              {
                path: PATHNAMES.CREATE,
                element: <Waiter />,
              },
            ],
          },
          {
            path: PATHNAMES.PRODUCTS,
            element: <Admin />,
          },
          {
            path: PATHNAMES.USERS,
            element: <Admin />,
          },
        ],
      },
    ],
  },
];

const App = () => {
  const router = createBrowserRouter(ROUTES);

  return <RouterProvider router={router} />;
};

export default App;
