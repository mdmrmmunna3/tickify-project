import React from 'react';
import { useAuth } from '../context/AuthProvider';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Loader from '../utils/Loader/Loader';

const ProtectedRoute = ({ allowedRoles, children }) => {

    const { token, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <Loader></Loader>
        );
    }
    if (!token) {
        return <Navigate to="/login" replace={true} state={{ from: location }}></Navigate>
    }

    if (!allowedRoles.includes(token.role)) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;