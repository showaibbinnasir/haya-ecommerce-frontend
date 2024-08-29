import { useContext } from "react";
import { authContext } from "../../contextApi/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const PrivateRouter = ({ children }) => {
    const { user, loading } = useContext(authContext)
    const location = useLocation();
    if (loading) {
        return <div>Loading</div>
    }
    if (!user) {
        return <Navigate to='/login' state={{ from: location }} replace></Navigate>
    }
    return children;
};

export default PrivateRouter;