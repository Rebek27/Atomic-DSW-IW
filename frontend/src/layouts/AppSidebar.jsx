import React, { useEffect, useCallback, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { useSidebar } from "../context/SidebarContext";
import {
  BoxCubeIcon,
  CalenderIcon,
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
  ListIcon,
  PageIcon,
  PieChartIcon,
  PlugInIcon,
  TableIcon,
  UserCircleIcon,
} from "../assets/icons/index";
// import SidebarWidget from "../context/SidebarContext";

const navItems = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    subItems: [{ name: "Ecommerce", path: "/", pro: false }],
  },
  { icon: <CalenderIcon />, name: "Calendar", path: "/calendar" },
  { icon: <UserCircleIcon />, name: "User Profile", path: "/profile" },
  {
    name: "Forms",
    icon: <ListIcon />,
    subItems: [{ name: "Form Elements", path: "/form-elements", pro: false }],
  },
  {
    name: "Tables",
    icon: <TableIcon />,
    subItems: [{ name: "Basic Tables", path: "/basic-tables", pro: false }],
  },
  {
    name: "Pages",
    icon: <PageIcon />,
    subItems: [
      { name: "404 Error", path: "/404", pro: false },
      { name: "Blank Page", path: "/blank", pro: false },
    ],
  },
];

const othersItems = [
  {
    icon: <PieChartIcon />, name: "Charts",
    subItems: [
      { name: "Line Chart", path: "/line-chart", pro: false },
      { name: "Bar Chart", path: "/bar-chart", pro: false },
    ],
  },
  {
    icon: <BoxCubeIcon />, name: "UI Elements",
    subItems: [
      { name: "Alerts", path: "/alerts", pro: false },
      { name: "Avatar", path: "/avatars", pro: false },
      { name: "Badge", path: "/badges", pro: false },
      { name: "Buttons", path: "/buttons", pro: false },
      { name: "Images", path: "/images", pro: false },
      { name: "Videos", path: "/videos", pro: false },
    ],
  },
  {
    icon: <PlugInIcon />, name: "Authentication",
    subItems: [
      { name: "Sign In", path: "/signin", pro: false },
      { name: "Sign Up", path: "/signup", pro: false },
    ],
  },
];

const AppSidebar = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const isActive = useCallback((path) => location.pathname === path, [location.pathname]);

  return (
    <aside className={`fixed mt-16 flex flex-col left-0 bg-white h-screen transition-all border-r 
      ${isExpanded || isMobileOpen ? "w-64" : "w-20"}`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="py-8 flex justify-center">
        <Link to="/">
          <img src="/images/logo/logo.svg" alt="Logo" width={150} height={40} />
        </Link>
      </div>
      <nav className="mb-6">
        <h2 className="mb-4 text-xs uppercase text-gray-400">Menu</h2>
        <ul>
          {navItems.map((nav, index) => (
            <li key={index}>
              {nav.path ? (
                <Link to={nav.path} className={`block p-3 ${isActive(nav.path) ? "bg-gray-200" : ""}`}>
                  {nav.icon} {nav.name}
                </Link>
              ) : (
                <button onClick={() => setOpenSubmenu(openSubmenu === index ? null : index)} className="block w-full text-left p-3">
                  {nav.icon} {nav.name} <ChevronDownIcon className={`inline ${openSubmenu === index ? "rotate-180" : ""}`} />
                </button>
              )}
              {nav.subItems && openSubmenu === index && (
                <ul className="ml-5">
                  {nav.subItems.map((sub, subIndex) => (
                    <li key={subIndex}>
                      <Link to={sub.path} className={`block p-2 ${isActive(sub.path) ? "bg-gray-200" : ""}`}>{sub.name}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AppSidebar;