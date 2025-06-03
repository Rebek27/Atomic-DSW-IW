import { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import { olvidasteContra } from '../../services/auth/authService';


/**
 * Componente SolicitarRecuperacion
 * Permite al usuario ingresar su correo electrónico para solicitar un enlace de recuperación de contraseña.
 */

function SolicitarRecuperacion() {
  const [mensaje, setMensaje] = useState('');



  //Función que maneja el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    if (!data.correo) {
      setMensaje('Ingrese el correo para continuar por favor');
      return;
    }

    try {
      const res = await olvidasteContra(data);
      console.log(res);

      // Mensaje de éxito
      setMensaje('Revisa tu correo. Te hemos enviado un enlace de recuperación.');
    } catch (error) {
      console.error('Error al solicitar recuperación:', error);
      setMensaje('Ocurrió un error. Intenta nuevamente.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-indigo-700 mb-6">
          Recuperación de tu cuenta
        </h1>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo de correo */}
          <div>
            <label htmlFor="correo" className="block text-sm font-medium text-gray-700 mb-1">
              Ingrese el correo asociado a su cuenta
            </label>
            <input
              id="correo"
              name="correo"
              type="email"
              required
              autoComplete="email"
              placeholder="ejemplo@correo.com"
              className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Botón de envío */}
          <div>
            <button
              type="submit"
              className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Solicitar recuperación
            </button>
          </div>
        </form>

        {/* Mensaje opcional */}
        {mensaje && (
          <p className="mt-4 text-center text-sm text-red-600 font-medium">
            {mensaje}
          </p>
        )}
      </div>
    </div>
  );
}

export default SolicitarRecuperacion;