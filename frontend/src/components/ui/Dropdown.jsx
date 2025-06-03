import React, { useEffect, useRef } from "react";



/**
 * Componente Dropdown reutilizable.
 * Muestra un menú desplegable flotante y lo cierra automáticamente cuando se hace clic fuera de él.
 *
 * Props:
 * - isOpen (boolean): Indica si el dropdown debe mostrarse.
 * - onClose (function): Función que se ejecuta para cerrar el dropdown (por ejemplo, al hacer clic fuera).
 * - children (ReactNode): Contenido del dropdown (usualmente opciones o enlaces).
 * - className (string): Clases adicionales para personalizar el estilo del dropdown.
 */


export const Dropdown = ({ isOpen, onClose, children, className = "" }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {

     // Función para manejar clics fuera del dropdown
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest(".dropdown-toggle")
      ) {
        onClose();
      }
    };

      // Agrega el listener cuando el componente se monta
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
       // Limpia el listener cuando el componente se desmonta
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className={`absolute z-40 right-0 mt-2 rounded-xl border border-gray-200 bg-white shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark ${className}`}
    >
      {children}
    </div>
  );
};
