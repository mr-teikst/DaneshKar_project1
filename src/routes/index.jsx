import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App.jsx";
import PublicLayout from "../layouts/public/PublicLayout.jsx";
import PrivateLayout from "../layouts/private/PrivateLayout.jsx";
import Login from "../pages/Login/Login.jsx";
import Signup from "../pages/Signup/Signup.jsx";
import Home from "../pages/Home/Home.jsx";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    // errorElement: <Error />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    element: <PrivateLayout />,
    children: [
      {
        path: "/Home",
        element: <Home />,
      },
      // {
      //   path: "/profile",
      //   element: <Profile />,
      // },
    ],
  },
]);
