import {createBrowserRouter,} from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/allinventory",
            element: <div>All Inventory</div>
        },
        {
            path: "/about",
            element: <div>About</div>
        },
        {
            path: "/contact",
            element: <div>Contact</div>
        },
        {
            path: "/admin",
            element: <div>Admin</div>
        },
        {
            path: "/profile",
            element: <div>Profile</div>
        },
      ]
    },
  ]);

  export default router;