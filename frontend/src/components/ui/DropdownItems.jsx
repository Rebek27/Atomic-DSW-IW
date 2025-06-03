import React from "react";
import { Link } from "react-router-dom";


/**
 * Componente reutilizable para representar un ítem de un menú desplegable (dropdown).
 * Puede comportarse como un botón o un enlace, según la prop `tag`.
 */

export const DropdownItem = ({
  tag = "button",
  to,
  onClick,
  onItemClick,
  baseClassName = "block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900",
  className = "",
  children,
}) => {

  // Combina las clases base con las clases personalizadas
  const combinedClasses = `${baseClassName} ${className}`.trim();



  // Manejador general del clic
  const handleClick = (event) => {
    if (tag === "button") {
      event.preventDefault();
    }
    if (onClick) onClick();
    if (onItemClick) onItemClick();
  };


  // Si el ítem se debe comportar como un enlace
  if (tag === "a" && to) {
    return (
      <Link to={to} className={combinedClasses} onClick={handleClick}>
        {children}
      </Link>
    );
  }


  // Si el ítem se comporta como botón (por defecto)
  return (
    <button onClick={handleClick} className={combinedClasses}>
      {children}
    </button>
  );
};
