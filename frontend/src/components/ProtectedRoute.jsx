import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {jwtDecode} from 'jwt-decode';

const ProtectedRoute = () => {
  const { token } = useAuth();

  if (!token) return <Navigate to="/login" replace />;

  try {
    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("sToken");
      return <Navigate to="/login" replace />;
    }
  } catch (err) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
