import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; 
import { getUserByCorreo } from '../services/auth/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('sToken') || null);
  const [user, setUser] = useState(null);

  // Inicializa usuario a partir del token (si existe y es válido)
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded); // info básica del token (correo, rol, etc.)
  
        // 🔍 obtener datos más detallados desde la API (si lo necesitas)
        const res = await getUserByCorreo(decoded.correo);
        setUser(res.data); // ahora user tendrá toda la info del usuario
      } catch (err) {
        console.error("Error al cargar usuario:", err);
        localStorage.removeItem('sToken');
        setToken(null);
        setUser(null);
      }
    };
  
    if (token) {
      fetchUserDetails();
    } else {
      setUser(null);
    }
  }, [token]);

  // Función para iniciar sesión
  const login = (newToken) => {
    try {
      const decoded = jwtDecode(newToken);
      localStorage.setItem('sToken', newToken);
      setToken(newToken);
      setUser(decoded);
    } catch (err) {
      console.error("Token inválido en login:", err);
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('sToken');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
    return useContext(AuthContext);
  }
export { useAuth };

