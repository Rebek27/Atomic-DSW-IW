import React, { createContext, useContext, useState, useEffect } from "react";

const SidebarContext = createContext(undefined);


/**
 * Hook personalizado para acceder fácilmente al contexto del sidebar.
 * Lanza un error si se usa fuera del <SidebarProvider>.
 */

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

/**
 * Proveedor del contexto del sidebar.
 * Maneja los estados globales relacionados con el comportamiento y visibilidad del sidebar.
 *
 * Props:
 * - children: Los componentes hijos que podrán acceder al contexto.
 */

export const SidebarProvider = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState(null);



  /**
    * useEffect para detectar el tamaño de la pantalla y ajustar si es móvil.
    * Si el ancho es menor a 768px, se considera móvil y se cierra el sidebar automáticamente.
    */
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMobileOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Alterna el estado expandido del sidebar (escritorio)
  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  // Alterna visibilidad del sidebar en modo móvil
  const toggleMobileSidebar = () => {
    setIsMobileOpen((prev) => !prev);
  };

  // Alterna apertura de un submenú específico
  const toggleSubmenu = (item) => {
    setOpenSubmenu((prev) => (prev === item ? null : item));
  };

  return (
    <SidebarContext.Provider
      value={{
        isExpanded: isMobile ? false : isExpanded,
        isMobileOpen,
        isHovered,
        activeItem,
        openSubmenu,
        toggleSidebar,
        toggleMobileSidebar,
        setIsHovered,
        setActiveItem,
        toggleSubmenu,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};