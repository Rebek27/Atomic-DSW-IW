import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { loginRequest } from "../../services/auth/authService";
import { useNavigate } from "react-router";
// import { useAuth } from "../hooks/useAuth";

export default function LoginForm() {
  const { login } = useAuth();
  const [loading,setLoading] = useState(false);
  //const [error,setError] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginRequest({ correo, contrasena });
      login(res.data.token);
      setLoading(false);

      navigate("/home");
    } catch (err) {
      alert(err.response?.data.mensaje.output.payload.message);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative z-10 flex cursor-pointer items-center overflow-hidden rounded-xl border border-slate-1000 p-[1.9px] justify-center ">
        <div
          className="animate-rotate absolute inset-0 h-full w-full rounded-full bg-[conic-gradient(#0ea5e9_20deg,transparent_120deg)]"
        ></div>
        <div className="relative z-20 flex w-full rounded-[0.60rem] bg-slate-800">

          <div className="bg-white rounded-md p-10  bg-opacity-100  sm:mx-auto sm:w-full sm:max-w-lg">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                alt="Atomic"
                src="src/assets/Logo/AtomicCirculo.png"
                className="mx-auto h-20 w-20 aspect-4/2 md:aspect-square"
              />
              <h2 className="mt-0 text-center text-2xl/9 font-bold tracking-tight text-inherit">
                Inicia Sesión
              </h2>
            </div>
            <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm ">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm/6 font-medium text-inherit">
                    Correo Electrónico
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                      required
                      autoComplete="email"
                      className="block border-1 w-full rounded-md bg-gray-300 px-2 py-0.5 text-base text-gray-900 outline-1 outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-0 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm/6 font-medium text-inherit">
                      Contraseña
                    </label>

                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={contrasena}
                      onChange={(e) => setContrasena(e.target.value)}
                      required
                      autoComplete="current-password"
                      className="block border-1 w-full rounded-md bg-gray-300 px-2 py-0.5 text-base text-gray-900 outline-1 outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-0 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                  <div className="text-xs/6 mt-0">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-400">
                      ¿Olvidaste tu Contraseña?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-indigo-600"
                  >
                    {loading ? <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg> : "Iniciar Sesión"}
                  </button>
                </div>
              </form>

              <p className="mt-5 text-center text-sm/6 text-inherit">
                ¿No tienes una cuenta?{' '}
                <a href="/singup" className="font-semibold text-indigo-800 hover:text-indigo-500">
                  ¡Regístrate Ahora!
                </a>
              </p>
              <hr className="mt-3 border-gray-300" />
              {/* Botón de inicio de sesión con Google */}
              <div className="mt-5">
                <button
                  type="button"
                  className="flex w-full justify-center items-center gap-2 rounded-md bg-white border border-indigo-300 px-3 py-1.5 text-sm/6 font-semibold text-gray-700 shadow-xs hover:bg-indigo-50 hover:border-outline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <img
                    alt="Google logo"
                    src="https://logos-world.net/wp-content/uploads/2020/09/Google-Symbol.png"
                    className="h-5 w-auto"
                  />
                  Iniciar sesión con Google
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}