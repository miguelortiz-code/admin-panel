import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Wrench,
  FileText,
  Shield,
  Settings,
  ChevronDown,
  Moon,
  Sun,
} from "lucide-react";

export default function Sidebar({ isCollapsed }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [darkMode, setDarkMode] = useState(false);

  const menuSections = [
    {
      title: "GENERAL",
      items: [{ name: "Dashboard", icon: LayoutDashboard }],
    },
    {
      title: "GESTIÓN",
      items: [
        {
          name: "Clientes",
          icon: Users,
          submenu: ["Lista", "Crear cliente"],
        },
        {
          name: "Servicios",
          icon: Wrench,
          submenu: ["Lista", "Crear servicio"],
        },
      ],
    },
    {
      title: "SISTEMA",
      items: [
        { name: "Reportes", icon: FileText },
        { name: "Auditoría", icon: Shield },
        {
          name: "Configuración",
          icon: Settings,
          submenu: ["Planes", "Categorías"],
        },
      ],
    },
  ];

  const toggleMenu = (menuName) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  return (
    <aside className="h-full bg-gray-900 text-white flex flex-col">
      
      {/* HEADER */}
      <div className="p-4 text-center font-bold text-lg border-b border-gray-800">
        {!isCollapsed ? "Admin Panel" : "AP"}
      </div>

      {/* MENU */}
      <div className="flex-1 p-2">
        {menuSections.map((section) => (
          <div key={section.title} className="mb-4">
            
            {!isCollapsed && (
              <p className="text-xs text-gray-400 px-2 mb-2">
                {section.title}
              </p>
            )}

            <div className="flex flex-col gap-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isOpen = activeMenu === item.name;
                const isActive = activeItem === item.name;

                return (
                  <div key={item.name}>
                    
                    {/* ITEM */}
                    <div
                      onClick={() => {
                        setActiveItem(item.name);
                        if (item.submenu) toggleMenu(item.name);
                      }}
                      className={`
                        relative group flex items-center 
                        ${isCollapsed ? "justify-center" : "justify-between"}
                        p-2 rounded-lg cursor-pointer transition-all duration-200
                        ${isActive ? "bg-gray-800" : "hover:bg-gray-800"}
                      `}
                    >
                      {/* Left */}
                      <div
                        className={`flex items-center ${
                          isCollapsed ? "" : "gap-3"
                        }`}
                      >
                        <Icon className="w-5 h-5" />

                        {!isCollapsed && (
                          <span className="text-sm">{item.name}</span>
                        )}
                      </div>

                      {/* Arrow */}
                      {!isCollapsed && item.submenu && (
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      )}

                      {/* TOOLTIP */}
                      {isCollapsed && (
                        <span className="
                          absolute left-full ml-3
                          bg-gray-800 text-white text-xs px-2 py-1 rounded-md
                          opacity-0 translate-x-2
                          group-hover:opacity-100 group-hover:translate-x-0
                          transition-all duration-200
                          whitespace-nowrap
                          z-50
                          pointer-events-none
                        ">
                          {item.name}
                        </span>
                      )}
                    </div>

                    {/* SUBMENU */}
                    {!isCollapsed && item.submenu && (
                      <div
                        className={`
                          overflow-hidden transition-all duration-300
                          ${
                            isOpen
                              ? "max-h-40 opacity-100 mt-1"
                              : "max-h-0 opacity-0"
                          }
                        `}
                      >
                        <div className="ml-8 flex flex-col gap-1 text-sm text-gray-300">
                          {item.submenu.map((sub) => (
                            <span
                              key={sub}
                              className="hover:text-white cursor-pointer"
                            >
                              {sub}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* DARK MODE (BOTTOM) */}
      <div className="p-3 border-t border-gray-800">
        <div
          onClick={() => setDarkMode(!darkMode)}
          className={`
            flex items-center cursor-pointer rounded-lg p-2 hover:bg-gray-800 transition
            ${isCollapsed ? "justify-center" : "justify-between"}
          `}
        >
          <div className="flex items-center gap-3">
            {darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}

            {!isCollapsed && (
              <span className="text-sm">
                {darkMode ? "Light Mode" : "Dark Mode"}
              </span>
            )}
          </div>

          {!isCollapsed && (
            <div
              className={`
                w-10 h-5 flex items-center bg-gray-600 rounded-full p-1
                ${darkMode ? "bg-blue-600" : ""}
              `}
            >
              <div
                className={`
                  bg-white w-4 h-4 rounded-full shadow-md transform transition
                  ${darkMode ? "translate-x-5" : ""}
                `}
              />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}