import { useEffect, useState } from "react";
import { registerRequest } from "../../services/auth/authService";
import { useNavigate } from "react-router-dom";

export default function SignUpForm() {
  const navigate = useNavigate();
  const [mensaje,setMensaje] = useState("");

  function calcularEdad(fechaNacimiento) {
    const hoy = new Date(); // Fecha actual
    const nacimiento = new Date(fechaNacimiento); // Convertir la fecha de nacimiento a un objeto Date
  
    let edad = hoy.getFullYear() - nacimiento.getFullYear(); // Diferencia de años
    const mes = hoy.getMonth() - nacimiento.getMonth(); // Diferencia de meses
  
    // Ajustar la edad si el cumpleaños aún no ha ocurrido este año
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
  
    return edad;
  }  

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target); // 'event.target' es el formulario
    const data = Object.fromEntries(formData.entries()); // Convierte FormData a un objeto

    // Imprime todos los datos para verificar que se extrajeron correctamente
    console.log('Datos extraídos del formulario:',data);
    if(!data){
      setMensaje('Campos vacíos no se puede continuar con el registro');
      return;
    }
    if(data.contrasena != data.confContrasena){
      setMensaje('Las contraseñas no coinciden');
      return;
    }

    data.edad = calcularEdad(data.edad);

    try {
      await registerRequest(data);
      setMensaje("Registro exitoso. Por favor revisa tu correo para verificar tu cuenta.");
      // Opcional: puedes redirigir al login automáticamente
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      console.error("Error al registrar:", err);
    }
  };

  useEffect(() =>{
    console.log(mensaje);
  },[mensaje]);

  return (
    <>
      <div className="relative z-10 flex cursor-pointer items-center overflow-hidden rounded-xl border border-slate-1000 p-[1.9px] justify-center ">
        <div
          className="animate-rotate absolute inset-0 h-full w-full rounded-full bg-[conic-gradient(#0ea5e9_20deg,transparent_120deg)]"
        ></div>
        <div className="relative z-20 flex w-full rounded-[0.60rem] bg-slate-800">
          <div className="bg-white rounded-md p-8 bg-opacity-100 sm:mx-auto sm:w-full sm:max-w-lg">
            <div className="mb-2 sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                alt="Atomic"
                src="src/assets/Logo/AtomicCirculo.png"
                className="flex mb-3 mx-auto h-20 w-20"
              />
              <h2 className="mb-3 text-center text-2xl font-bold tracking-tight text-inherit">
                Registrate, ingresa tus datos.
              </h2>
            </div>

            <div className="mt-1 sm:mx-auto sm:w-full sm:max-w-xl">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <div>
                    <label htmlFor="names" className="block text-sm font-medium text-inherit">
                      Nombre(s)
                    </label>
                    <div className="mt-1">
                      <input
                        id="names"
                        name="nombre"
                        type="text"
                        required
                        autoComplete="email"
                        className="block border-1 w-full rounded-md bg-gray-300 px-2 py-0.5 text-base text-gray-900 outline-1 outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-0 focus:outline-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-inherit">
                      Apellidos
                    </label>
                    <div className="mt-1">
                      <input
                        id="lastName"
                        name="apellidos"
                        type="text"
                        required
                        autoComplete="email"
                        className="block border-1 w-full rounded-md bg-gray-300 px-2 py-0.5 text-base text-gray-900 outline-1 outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-0 focus:outline-indigo-600 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Segunda línea de campos de texto */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="birth" className="block text-sm font-medium text-inherit">
                      Fecha de nacimiento
                    </label>
                    <div className="mt-1">
                      <input
                        id="birth"
                        name="edad"
                        type="date"
                        required
                        className="block border-1 w-full rounded-md bg-gray-300 px-2 py-0.5 text-base text-gray-900 outline-1 outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-0 focus:outline-indigo-600 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="ocupacion" className="block text-sm font-medium text-inherit">
                      Ocupación
                    </label>
                    <div className="mt-1">
                      <input
                        id="ocupacion"
                        name="ocupacion"
                        type="text"
                        required
                        className="block border-1 w-full rounded-md bg-gray-300 px-2 py-0.5 text-base text-gray-900 outline-1 outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-0 focus:outline-indigo-600 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Tercera línea de campos de texto */}
                <div>
                  <label htmlFor="ocupacion" className="block text-sm font-medium text-inherit">
                    Correo Electrónico
                  </label>
                  <div className="mt-1">
                    <input
                      id="correo"
                      name="correo"
                      type="email"
                      required
                      className="block border-1 w-full rounded-md bg-gray-300 px-2 py-0.5 text-base text-gray-900 outline-1 outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-0 focus:outline-indigo-600 sm:text-sm"
                    />
                  </div>
                </div>

                {/* Cuarta línea de campos de texto */}
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

              <p className="mt-5 text-center text-sm text-inherit">
                ¿Ya tienes una cuenta?{' '}
                <a href="/login" className="font-semibold text-indigo-800 hover:text-indigo-500">
                  ¡Inicia Sesión!
                </a>
              </p>
              <hr className="mt-3 border-gray-300" />

              {/* Botón de inicio de sesión con Google */}
              <div className="mt-3 flex w-full justify-center items-center">
                <button
                  type="button"
                  className="flex w-1/2 justify-center items-center gap-2 rounded-md bg-white border border-indigo-300 px-2 py-2 text-sm font-semibold text-gray-700 shadow-xs hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <img
                    alt="Google logo"
                    src="https://logos-world.net/wp-content/uploads/2020/09/Google-Symbol.png"
                    className="h-5 w-auto"
                  />
                  Ingresar con Google
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
