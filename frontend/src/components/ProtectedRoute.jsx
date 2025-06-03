import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {jwtDecode} from 'jwt-decode';


/**
 * Componente que protege rutas privadas del frontend.
 * Solo permite el acceso si el usuario tiene un token válido y no expirado.
 */

const ProtectedRoute = () => {
  const { token } = useAuth(); // Obtiene el token actual desde el contexto de autenticación

  if (!token) return <Navigate to="/login" replace />;

  try {
    const decoded = jwtDecode(token);
       // Verifica si el token ha expirado
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("sToken"); // Elimina el token expirado del almacenamiento local
      return <Navigate to="/login" replace />;  // Redirige al login
    }
  } catch (err) {
     // Si el token no se puede decodificar (malformado), redirige al login
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;