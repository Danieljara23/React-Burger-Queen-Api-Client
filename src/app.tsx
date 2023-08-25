import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./app.css";
import Layout from "./pages/layout";
import { PATHNAMES } from "./services/route-service";
import { ProtectedRoute } from "./routes/protected-route";
import Home from "./pages/home";
import Waiter from "./pages/waiter";
import Admin from "./pages/admin";
import Login from "./pages/login";

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
