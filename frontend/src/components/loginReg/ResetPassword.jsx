import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../services/auth/authService';

function ResetPassword() {
  const [mensaje, setMensaje] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const correo = searchParams.get('correo');
    const token = searchParams.get('token');

    console.log(correo);
    console.log(token);
    const formData = new FormData(event.target); // 'event.target' es el formulario
    const data = Object.fromEntries(formData.entries()); // Convierte FormData a un objeto

    console.log('Datos extraídos del formulario:',data.contrasena);
    if(!data){
      setMensaje('Rellene los datos para continuar por favor');
      return;
    }
    if(data.contrasena !== data.confContrasena){
        setMensaje('Las contraseñas no coinciden, reviselas por favor');
        return;
    }
    const res = await resetPassword(token,correo,data);
    console.log(res);
    setTimeout(()=>{navigate('/login');},2000);
  }

  return (
    <div>
      <h1>Verificando tu cuenta</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-inherit">
                    Contraseña
                </label>
                <div className="mt-1">
                    <input
                        id="password"
                        name="contrasena"
                        type="password"
                        required
                        autoComplete="current-password"
                        className="block border-1 w-full rounded-md bg-gray-300 px-2 py-0.5 text-base text-gray-900 outline-1 outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-0 focus:outline-indigo-600 sm:text-sm"
                    />
                </div>
            </div>
            <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="passwordConf" className="block text-sm font-medium text-inherit">
                        Confirmar Contraseña
                    </label>
                </div>
                <div className="mt-1">
                    <input
                        id="passwordConf"
                        name="confContrasena"
                        type="password"
                        required
                        autoComplete="current-password"
                        className="block border-1 w-full rounded-md bg-gray-300 px-2 py-0.5 text-base text-gray-900 outline-1 outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-0 focus:outline-indigo-600 sm:text-sm"
                    />
                </div>
            </div>
        </div>{/* Final de la cuarta línea */}

        <div>
            <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Registrarse
            </button>
        </div>
      </form>
      <p>{mensaje}</p>
    </div>
  );
}

export default ResetPassword;