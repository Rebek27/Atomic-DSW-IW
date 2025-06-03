import React, { useEffect, useRef, useState } from "react";
import { useSidebar } from "../context/SidebarContext";
import UserDropdown from "./UserDropdown";


/**
 * Componente AppHeader
 * Renderiza la barra superior de la aplicación, que incluye:
 * - Botón para abrir/cerrar el sidebar
 * - Acciones de usuario (UserDropdown)
 * - Accesibilidad con combinación de teclas (Ctrl+K)
 */
const AppHeader = () => {
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();

  const handleToggle = () => {
    if (window.innerWidth >= 991) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };



  return (
    <header className="sticky top-0 flex w-full bg-white border-gray-200 z-99999 dark:border-gray-800 dark:bg-gray-900 lg:border-b">
      <div className="flex flex-col items-center justify-between flex-grow lg:flex-row lg:px-6">
        <div className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-200 dark:border-gray-800 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">
          <button
            className="items-center justify-center w-10 h-10 text-gray-500 border-gray-200 rounded-lg z-99999 dark:border-gray-800 lg:flex dark:text-gray-400 lg:h-11 lg:w-11 lg:border"
            onClick={handleToggle}
            aria-label="Toggle Sidebar"
          >
            {isMobileOpen ? "✖" : "☰"}
          </button>
          <div className="hidden lg:block">
          </div>
        </div>

        {/* Sección derecha del header (menú de usuario, acciones) */}
        <div className={`${isApplicationMenuOpen ? "flex" : "hidden"} items-center justify-between w-full gap-4 px-5 py-4 lg:flex shadow-theme-md lg:justify-end lg:px-0 lg:shadow-none`}>
          <div className="flex items-center gap-2 2xsm:gap-3">
          </div>
          <UserDropdown />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;