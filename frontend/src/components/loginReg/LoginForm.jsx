

//rounded-lg bg-sky-50 shadow-lg p-2 border-1
export default function LoginForm(){
    
    return(
        <>
        <div className="flex flex-1 flex-col justify-center min-h-full px-5 py-3 lg:px-8">  
          <div className="bg-white rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-90 mt-1 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="mt-0 sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Atomic"
              src="src/assets/Logo/AtomicCirculo.png"
              className="mx-auto h-20 w-20 aspect-4/2 md:aspect-square"
            />
            <h2 className="mt-0 text-center text-2xl/9 font-bold tracking-tight text-inherit">
              Inicia Sesión En Tu Cuenta
            </h2>
          </div>
            <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm ">
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
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-indigo-600"
                  >
                    Iniciar Sesión
                  </button>
                </div>
              </form>
  
              <p className="mt-5 text-center text-sm/6 text-inherit">
                ¿No tienes una cuenta?{' '}
                <a href="#" className="font-semibold text-indigo-800 hover:text-indigo-500">
                  ¡Regístrate Ahora!
                </a>
              </p>
                <hr className="mt-3 border-gray-300"/>
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
        </>
    );
}