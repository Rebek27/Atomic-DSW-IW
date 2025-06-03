import { useState } from "react";
import { DropdownItem } from "../components/ui/DropdownItems";
import { Dropdown } from "../components/ui/Dropdown";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router";
import { useAuth } from '../context/AuthContext'; // ruta según tu proyecto


export default function UserDropdown() {
  // Estado para controlar si el dropdown está abierto o cerrado
  const [isOpen, setIsOpen] = useState(false);

  // Obtenemos las funciones y datos del contexto de autenticación
  const { logout } = useAuth();
  const { user } = useAuth();
  const navigate = useNavigate();


  // Maneja el cierre de sesión
  const handleLogout = (e) => {
    e.preventDefault();        // evita que navegue de inmediato
    logout();                  // elimina el token y limpia el contexto
    navigate('/');       // redirige manualmente
  };

  // Alterna la visibilidad del dropdown
  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  // Cierra el dropdown
  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div className="relative">
      {/* Botón que activa el dropdown */}
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-700 dropdown-toggle dark:text-gray-400"
      >
        <span className="mr-3 overflow-hidden rounded-full h-11 w-11">
          <img src={`/${user?.imagen}`} alt="User" />
        </span>
        <span className="block mr-1 font-medium text-theme-sm">{user?.nombreUsuario}</span>
        <svg
          className={`stroke-gray-500 dark:stroke-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
            }`}
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
      >
        <div>
          <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
            {user?.nombreUsuario}
          </span>
          <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
            {user?.correo}
          </span>
        </div>

        <ul className="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800">
          <li>
            <DropdownItem onItemClick={closeDropdown} tag="a" to="/profile">
              Editar Perfil
            </DropdownItem>
          </li>
          <li>
            <DropdownItem onItemClick={closeDropdown} tag="a" to="/faq">
              Ayuda
            </DropdownItem>
          </li>
        </ul>
        <Link
          to="/"
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 mt-3"
        >
          Cerrar Sesión
        </Link>
      </Dropdown>
    </div>
  );
}
