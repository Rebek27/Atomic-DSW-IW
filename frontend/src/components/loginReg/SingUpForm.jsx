

export default function SingUpForm(){
    return(
        <>
            <div className="flex flex-1 flex-col justify-center min-h-full px-6 py-6 lg:px-8">
                <div className="bg-opacity-20 sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                    alt="Atomic"
                    src="src/assets/Logo/AtomicCirculo.png"
                    className="mx-auto h-20 w-20 aspect-4/2 md:aspect-square"
                    />
                    <h2 className="mt-0 text-center text-2xl/9 font-bold tracking-tight text-inherit">
                    Registrate en Atomic
                    </h2>
                </div>

                <div className="bg-sky-800 border border-sky-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-20 mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
              <form action="#" method="POST" className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm/6 font-medium text-inherit">
                    Correo Electrónico
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="block border-2 border-sky-200 w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-4 outline-offset-2 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
  
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm/6 font-medium text-inherit">
                      Contraseña
                    </label>
                    <div className="text-sm">
                      <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-400">
                        ¿Olvidaste tu Contraseña?
                      </a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      autoComplete="current-password"
                      className="block border-2 border-sky-200 w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-4 outline-offset-2 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
  
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Registrarse
                  </button>
                </div>
              </form>
  
              <p className="mt-6 text-center text-sm/6 text-inherit">
                ¿Ya tienes una cuenta?{' '}
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-400">
                  ¡Solo Inicia Sesión!
                </a>
              </p>

                {/* Botón de inicio de sesión con Google */}
            <div className="mt-6">
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
        </>
    );

}