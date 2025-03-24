import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // ✅ Versión 4+

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('sToken') || null);
  const [user, setUser] = useState(null);

  // Inicializa usuario a partir del token (si existe y es válido)
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (err) {
        console.error("Token inválido al decodificar:", err);
        localStorage.removeItem('sToken');
        setToken(null);
        setUser(null);
      }
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

// import { createContext, useContext, useState, useEffect } from 'react';
// import {jwtDecode} from 'jwt-decode';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(() => localStorage.getItem('sToken'));
//   const [user, setUser] = useState(() => {
//     if (token) return jwtDecode(token);
//     return null;
//   });

//   useEffect(() => {
//     if (token) {
//       setUser(jwtDecode(token));
//     } else {
//       setUser(null);
//     }
//   }, [token]);

//   const login = (token) => {
//     localStorage.setItem('sToken', token);
//     setToken(token);
//   };

//   const logout = () => {
//     localStorage.removeItem('sToken');
//     setToken(null);
//   };

//   return (
//     <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated: !!token }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
