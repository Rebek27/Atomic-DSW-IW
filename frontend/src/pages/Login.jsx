import fondo from "../assets/images/FondoLogin.png";
import { HiArrowCircleLeft } from "react-icons/hi";

import LoginForm from "../components/loginReg/LoginForm";

export default function Login() {
    // Estilo de fondo aplicado al contenedor principal
  const bgStyle = {
    backgroundImage: `url(${fondo})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <>
      <div className="h-[100vh] flex justify-center items-center "
        style={bgStyle}>


        <LoginForm />



        {/* Botón de regreso a la página principal */}
        <button
          type="button"
          className="absolute bottom-6 left-6 text-white bg-gradient-to-r from-cyan-500 to-blue-500 
          hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-large rounded-lg text-sm px-2 py-1 text-center me-2 mb-2"
        >
          <a href="/">
            <HiArrowCircleLeft className="text-4xl h-10 w-14 p-1" />
          </a>
        </button>
      </div>
    </>
  );
}
