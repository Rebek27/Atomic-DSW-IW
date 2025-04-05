import { useEffect, useState,useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { verifyCorreo } from './auth/authService';

function VerificarCuenta() {
  const [mensaje, setMensaje] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const verified = useRef(false);

  useEffect(() => {
    if(verified.current) return;
    verified.current = true;

    const f1 = async () => {
        const token = searchParams.get('token');
        const correo = searchParams.get('correo');
        try {
            const res = await verifyCorreo(token, correo);
            setMensaje(res.mensaje || 'Verificación completada');
            //Redirige después de unos segundos, por ejemplo
            setTimeout(() => navigate('/login'), 2000);
        } catch (error) {
            setMensaje('Error al verificar la cuenta');
            console.error(error);
        }
    }
    f1();
  });

  return (
    <div>
      <h1>Verificando tu cuenta</h1>
      <p>{mensaje}</p>
    </div>
  );
}

export default VerificarCuenta;