import { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import { olvidasteContra } from '../../services/auth/authService';

function SolicitarRecuperacion() {
  const [mensaje, setMensaje] = useState('');
  //const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target); // 'event.target' es el formulario
    const data = Object.fromEntries(formData.entries()); // Convierte FormData a un objeto

    console.log('Datos extraídos del formulario:',data.correo);
    if(!data){
      setMensaje('Ingrese el correo para continuar por favor');
      return;
    }
    const res = await olvidasteContra(data);
    console.log(res);

  }

  return (
    <div>
      <h1>Recuperacion de tu cuenta</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
                <label htmlFor="names" className="block text-sm font-medium text-inherit">
                    Ingrese el correo asociado a su cuenta
                </label>
                <div className="mt-1">
                    <input
                        id="correo"
                        name="correo"
                        type="email"
                        required
                        autoComplete="email"
                        className="block border-1 w-full rounded-md bg-gray-300 px-2 py-0.5 text-base text-gray-900 outline-1 outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-0 focus:outline-indigo-500 sm:text-sm"
                    />
                </div>
            </div>
            <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Solicitar recuperacion
                </button>
            </div>
        </div>
      </form>
      <p>{mensaje}</p>
    </div>
  );
}

export default SolicitarRecuperacion;