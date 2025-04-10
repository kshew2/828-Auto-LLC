import {createBrowserRouter,} from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import CarDetail from "../pages/cars/CarDetail";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../components/AdminLogin";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import ManageCars from "../pages/dashboard/manageCars/ManageCars";
import AddCar from "../pages/dashboard/addCar/AddCar";
import UpdateCar from "../pages/dashboard/editCar/UpdateCar";
import AllInventory from "../pages/inventory/AllInventory";
import AboutUs from "../pages/about/AboutUs";
import Contact from "../pages/contact/Contact";

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
            element: <AllInventory />
        },
        {
            path: "/about",
            element: <AboutUs />
        },
        {
            path: "/contact",
            element: <Contact />
        },
        // {
        //     path: "/admin",
        //     element: <div>Admin</div>
        // },
        {
            path: "/profile",
            element: <div>Profile</div>
        },
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/register",
            element: <Register />
        },
        {
            path: "/Cars/:id",
            element: <CarDetail/>
        }
      ]
    },
    {
        path: "/admin",
        element: <AdminLogin/>
    },
    {
        path: "/dashboard",
        element:( <AdminRoute >
            <DashboardLayout/>
        </AdminRoute>),
        children: [
            {
                path: "",
                element: <AdminRoute><Dashboard/></AdminRoute>
            }, 
            {
                path: "add-new-car",
                element: <AdminRoute><AddCar/></AdminRoute>
            },
            {
                path: "edit-car/:id",
                element: <AdminRoute><UpdateCar/></AdminRoute>
            },
            {
                path: "manage-cars",
                element: <AdminRoute><ManageCars/></AdminRoute>
            }
        ]
    }
  ]);

  export default router;