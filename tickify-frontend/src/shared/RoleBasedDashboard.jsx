import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const RoleBasedDashboard = () => {
    const { token } = useAuth();
    if (!token) return <Navigate to='/login' />
    if (token.role === "admin") {
        return <Navigate to="/dashboard/admin" />;
    } else {
        return <Navigate to="/dashboard/customer" />;
    }
};

export default RoleBasedDashboard;