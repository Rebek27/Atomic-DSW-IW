import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserLogin } from "../../services/post/UserLogin";

export function useAuth() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Estado de carga

  const login = async (email, password) => {
    setLoading(true); // Activar el estado de carga
    setError(null);

    const t = await UserLogin(email,password);
    if (!t) {
      setError("Correo o contraseña incorrectos");
    } else {
      localStorage.setItem('sToken',t);
      navigate("/home");
    }
    setLoading(false);
    // setTimeout(() => { 
    //   const user = "usuario@hola.com";
    //   const pass = "123456";

    //   if (email === user && password === pass) {
    //     navigate("/home");
    //   } else {
    //     setError("Correo o contraseña incorrectos");
    //   }
      
    //   setLoading(false); // Desactivar el estado de carga
    // }, 2000);
  };

  return { login, error, loading };
}
