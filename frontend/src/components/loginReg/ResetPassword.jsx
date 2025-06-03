import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../services/auth/authService';

/**
 * Componente ResetPassword
 * Permite al usuario restablecer su contraseña usando un token y correo recibidos por URL.
 * Valida que ambas contraseñas coincidan y envía la solicitud al backend.
 */

function ResetPassword() {
    const [mensaje, setMensaje] = useState('');
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Maneja el envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Obtenemos correo y token desde la URL
        const correo = searchParams.get('correo');
        const token = searchParams.get('token');

        console.log(correo);
        console.log(token);
        const formData = new FormData(event.target); // 'event.target' es el formulario
        const data = Object.fromEntries(formData.entries()); // Convierte FormData a un objeto

        console.log('Datos extraídos del formulario:', data.contrasena);
        if (!data) {
            setMensaje('Rellene los datos para continuar por favor');
            return;
        }
        if (data.contrasena !== data.confContrasena) {
            setMensaje('Las contraseñas no coinciden, reviselas por favor');
            return;
        }
        const res = await resetPassword(token, correo, data);
        console.log(res);
        setTimeout(() => { navigate('/login'); }, 2000);
    }




    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-2xl font-bold text-center text-indigo-700 mb-6">
                    Restablecer Contraseña
                </h1>

                {/* Formulario de restablecimiento */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {/* Campo: Nueva contraseña */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Nueva Contraseña
                            </label>
                            <input
                                id="password"
                                name="contrasena"
                                type="password"
                                required
                                autoComplete="current-password"
                                placeholder="Ingresa nueva contraseña"
                                className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Campo: Confirmar contraseña */}
                        <div>
                            <label htmlFor="passwordConf" className="block text-sm font-medium text-gray-700 mb-1">
                                Confirmar Contraseña
                            </label>
                            <input
                                id="passwordConf"
                                name="confContrasena"
                                type="password"
                                required
                                autoComplete="current-password"
                                placeholder="Repite la contraseña"
                                className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    {/* Botón de envío */}
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                        >
                            Guardar Nueva Contraseña
                        </button>
                    </div>
                </form>

                {/* Mensaje de validación */}
                {mensaje && (
                    <p className="mt-4 text-center text-sm text-red-600 font-medium">{mensaje}</p>
                )}
            </div>
        </div>
    );
}

export default ResetPassword;