import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Estado de carga

  const login = (email, password) => {
    setLoading(true); // Activar el estado de carga
    setError(null);

    setTimeout(() => { 
      const user = "usuario@hola.com";
      const pass = "123456";

      if (email === user && password === pass) {
        navigate("/home");
      } else {
        setError("Correo o contraseña incorrectos");
      }
      
      setLoading(false); // Desactivar el estado de carga
    }, 2000);
  };

  return { login, error, loading };
}
