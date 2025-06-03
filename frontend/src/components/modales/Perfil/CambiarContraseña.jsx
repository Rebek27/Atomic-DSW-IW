import { useEffect, useState } from "react";
import { cambiarContrasena } from "../../../services/auth/authService";
import { toast } from "react-toastify";

const CambiarContrasena = ({ onClose, isVisible }) => {
    const [pass, setPass] = useState('');
    const [newPass, setNewPass] = useState('');


    // Limpiar los campos al abrir/cerrar el modal
    useEffect(() => {
        setPass("");
        setNewPass("");
    }, [isVisible]);


    // Maneja el envío del formulario para cambiar la contraseña
    const handleSubmit = async () => {
        try {
            await cambiarContrasena({ oldPass: pass, newPass: newPass });
            toast.success('Contraseña actualizada correctamene');
            onClose();
        } catch (error) {
            toast.error(error.response.data.mensaje.mensaje);
            console.error('Error al cambiar la contraseña:', error);
        }
    }

    // No renderiza nada si el modal no está visible
    if (!isVisible) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-lg font-semibold mb-4">Cambiar Contraseña</h2>
                <label htmlFor="contrasena-actual" className="block font-medium mb-1">
                    Contraseña Actual
                </label>
                <input
                    type="password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    className="w-full border px-4 py-2 rounded mb-2"
                />

                <label htmlFor="nueva-contrasena" className="block font-medium mb-1">
                    Nueva Contraseña
                </label>
                <input
                    type="password"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    className="w-full border px-4 py-2 rounded"
                />
                <div className="flex justify-end gap-2 mt-6">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                        Cancelar
                    </button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
}


export default CambiarContrasena;