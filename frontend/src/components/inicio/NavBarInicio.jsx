import { Menu, X } from "lucide-react";
import { useState } from "react";
import Atomic2 from "../../assets/Logo/AtomicCirculo.png";
import { navItems } from "./constants";

const NavbarInicio = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <nav className="sticky top-0 z-50 py-3 border-b border-neutral-300/40 bg-white/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 relative lg:text-sm">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <img className="h-14 w-14 mr-2" src={Atomic2} alt="Atomic2" />
            <span className="text-2xl tracking-tight text-black font-bold">Atomic</span>
          </div>

          {/* Menú en pantallas grandes */}
          <ul className="hidden lg:flex ml-14 space-x-12">
            {navItems.map((item, index) => (
              <li key={index}>
                <a href={item.href} className="text-black hover:text-[#4522fe]">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Botones en pantallas grandes */}
          <div className="hidden lg:flex justify-center space-x-6 items-center">
            <a
              href="/login"
              className="py-2 px-4 border rounded-lg text-black hover:bg-[#d3d7d8]"
            >
              Iniciar Sesión
            </a>
            <a
              href="/singup"
              className="py-2 px-4 rounded-lg bg-[#6142ff] text-white hover:bg-[#4d31d7]"
            >
              Crear cuenta
            </a>
          </div>

          {/* Botón del menú hamburguesa en móviles */}
          <div className="lg:hidden flex flex-col justify-end">
            <button onClick={toggleNavbar} className="text-white">
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        {mobileDrawerOpen && (
          <div className="fixed right-0 top-0 h-screen z-20 bg-neutral-900 w-3/4 p-6 flex flex-col items-center lg:hidden">
            <ul className="space-y-4">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a href={item.href} className="text-white hover:text-[#7c64fc]">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex space-x-4">
              <a
                href="#"
                className="py-2 px-4 border rounded-lg text-white hover:bg-neutral-800"
              >
                Iniciar Sesión
              </a>
              <a
                href="#"
                className="py-2 px-4 border rounded-lg bg-[#7c64fc] text-white hover:bg-[#6b54e8]"
              >
                Crear cuenta
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarInicio;
