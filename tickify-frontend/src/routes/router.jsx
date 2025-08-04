import { createBrowserRouter } from "react-router-dom";
// layouts 
import Main from "../Root/Main";
import DashboardLayouts from "../Root/DashboardLayouts";

// public pages 
import Home from "../pages/Home/Home";
import SignIn from "../pages/socal/SignIn";
import SignUp from "../pages/socal/SignUp";

import AllEvents from "../pages/AllEvents/AllEvents";
import EventsDetails from "../pages/AllEvents/EventsDetails";

// shared pages 
import RoleBasedDashboard from "../shared/RoleBasedDashboard";

// admin pages 
import AdminDashboard from "../pages/Admin/AdminDashboard";
import CreateEvents from "../pages/Admin/Events/CreateEvents";
import EventsList from "../pages/Admin/Events/EventsList";
import EventView from "../pages/Admin/Events/EventView";
import EventEdit from "../pages/Admin/Events/EventEdit";

// customer pages 
import CustomerDashboard from "../pages/Customer/CustomerDashboard";


// Route protection 
import ProtectedRoute from "../components/ProtectedRoute";
import Private from "../components/Private";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AllCustomer from "../pages/Admin/AllCustomer/AllCustomer";
import PaymentSuccess from "../pages/AllEvents/PaymentSuccess";
import MyPurchases from "../pages/Customer/MyPurchases";
import ManageSales from "../pages/Admin/ManageSales";
import ContactUs from "../pages/ContactUs/ContactUs";
import MyPurchasesEvent from "../pages/Customer/MyPurchasesEvent";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'login',
                element: <SignIn></SignIn>
            },
            {
                path: 'signUp',
                element: <SignUp></SignUp>
            },
            {
                path: 'allEvents',
                element: <AllEvents></AllEvents>
            },
            {
                path: 'contactUs',
                element: <ContactUs></ContactUs>
            },
            {
                path: 'payment-success',
                element: <PaymentSuccess></PaymentSuccess>
            },
            {
                path: 'explorEvent/:id',
                element: <Private><EventsDetails></EventsDetails></Private>
            },

        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayouts></DashboardLayouts>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            // Redirect based on user role
            { path: "", element: <RoleBasedDashboard /> },

            // Admin protected routes
            {
                element: <ProtectedRoute allowedRoles={["admin"]} />,
                children: [
                    { path: "admin", element: <AdminDashboard /> },
                    { path: "events", element: <EventsList /> },
                    { path: "events/:id", element: <EventView /> },
                    { path: "events/:id/edit", element: <EventEdit /> },
                    { path: "createEvent", element: <CreateEvents /> },
                    { path: "users", element: <AllCustomer /> },
                    { path: "sales", element: <ManageSales /> },
                ],
            },

            // Customer protected routes
            {
                element: <ProtectedRoute allowedRoles={["customer"]} />,
                children: [
                    { path: "customer", element: <CustomerDashboard /> },
                    { path: "purchases", element: <MyPurchases /> },
                    { path: "purchasesEvents", element: <MyPurchasesEvent /> },

                ],
            },
        ]
    },
])