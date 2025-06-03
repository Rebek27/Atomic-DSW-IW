import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiBox,         // FAQ icon
  FiCalendar,    // Calendario
  FiChevronDown, // Submenu toggle
  FiMoreHorizontal, // Dots icon
  FiList,        // Tareas
  FiUser,        // Perfil
  FiGrid,        // Inicio
  FiZap          // Mis hábitos
} from "react-icons/fi";
import LogoAtom from '../assets/images/AN.png'
import LogoAtom2 from '../assets/images/AW.png'
import circle from '../assets/images/AtomicCirculo.png'


import { useSidebar } from "../context/SidebarContext";


// Definición de las rutas principales del menú
const navItems = [
  {
    icon: <FiGrid />,
    name: "Inicio",
    path: "/Home",
  },
  {
    icon: <FiCalendar />,
    name: "Calendario",
    path: "/calendario",
  },
  {
    icon: <FiList />,
    name: "Tareas",
    path: "/tareas",
  },
  {
    icon: <FiZap />,
    name: "Mis hábitos",
    path: "/habitos",
  },
  {
    icon: <FiUser />,
    name: "Perfil",
    path: "/profile",
  },
];

const othersItems = [
  {
    icon: <FiBox />,
    name: "FAQ",
    path: "/faq",
  },
];

const AppSidebar = () => {
    // Obtención del estado global del sidebar
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

    // Estados locales para gestionar submenús
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [subMenuHeight, setSubMenuHeight] = useState({});
  const subMenuRefs = useRef({});

  const isActive = useCallback(
    (path) => location.pathname === path,
    [location.pathname]
  );

    // Detectar si algún submenú debe estar abierto según la ruta actual
  useEffect(() => {
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType,
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [location, isActive]);

    // Calcular la altura de submenús al abrirlos
  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index, menuType) => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };


  // Renderizar los items del menú con submenús opcionales
  const renderMenuItems = (items, menuType) => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => {
        const isOpen = openSubmenu?.type === menuType && openSubmenu?.index === index;
        const showText = isExpanded || isHovered || isMobileOpen;

        return (
          <li key={nav.name}>
            {nav.subItems ? (
              <button
                onClick={() => handleSubmenuToggle(index, menuType)}
                className={`menu-item group ${isOpen ? "menu-item-active" : "menu-item-inactive"} cursor-pointer ${!isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"}`}
              >
                <span className={`menu-item-icon-size ${isOpen ? "menu-item-icon-active" : "menu-item-icon-inactive"}`}>
                  {nav.icon}
                </span>
                {showText && <span className="menu-item-text">{nav.name}</span>}
                {showText && (
                  <FiChevronDown
                    className={`ml-auto w-20 h-5 transition-transform duration-200 ${isOpen ? "rotate-180 text-brand-500" : ""}`}
                  />
                )}
              </button>
            ) : (
              nav.path && (
                <Link
                  to={nav.path}
                  className={`menu-item group ${isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"}`}
                >
                  <span className={`menu-item-icon-size ${isActive(nav.path) ? "menu-item-icon-active" : "menu-item-icon-inactive"}`}>
                    {nav.icon}
                  </span>
                  {showText && <span className="menu-item-text">{nav.name}</span>}
                </Link>
              )
            )}


            {/* Subitems visibles solo si el sidebar está expandido */}
            {nav.subItems && showText && (
              <div
                ref={(el) => {
                  subMenuRefs.current[`${menuType}-${index}`] = el;
                }}
                className="overflow-hidden transition-all duration-300"
                style={{
                  height: isOpen ? `${subMenuHeight[`${menuType}-${index}`]}px` : "0px",
                }}
              >
                <ul className="mt-2 space-y-1 ml-9">
                  {nav.subItems.map((subItem) => (
                    <li key={subItem.name}>
                      <Link
                        to={subItem.path}
                        className={`menu-dropdown-item ${isActive(subItem.path) ? "menu-dropdown-item-active" : "menu-dropdown-item-inactive"}`}
                      >
                        {subItem.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );

    // Renderizado del componente visual del sidebar
  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      
    >
           {/* Logo */}
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link to="/home">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <img
                className="dark:hidden"
                src={LogoAtom}
                alt="Logo"
                width={190}
                height={50}
              />
              <img
                className="hidden dark:block"
                src={LogoAtom2}
                alt="Logo"
                width={190}
                height={50}
              />
            </>
          ) : (
            <img
              src={circle}
              alt="Logo"
              width={46}
              height={46}
            />
          )}
        </Link>
      </div>

        {/* Menú principal */}
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <FiMoreHorizontal className="size-6" />
                )}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>
            <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Others"
                ) : (
                  <FiMoreHorizontal />
                )}
              </h2>
              {renderMenuItems(othersItems, "others")}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
