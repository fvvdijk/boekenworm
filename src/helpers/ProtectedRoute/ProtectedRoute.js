import { Navigate } from "react-router-dom";
import { useAuth } from "../../services/Context/AuthContext";

export const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    if (!user) {
        return <Navigate to="/" />;
    }
    return children;
};