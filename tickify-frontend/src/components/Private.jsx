import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Loader from "../utils/Loader/Loader";


const Private = ({ children }) => {
    const { token, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <Loader></Loader>
        );
    }
    if (token) {
        return children
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};

export default Private;