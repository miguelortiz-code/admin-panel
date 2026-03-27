import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Wrench,
  FileText,
  Shield,
  Settings,
  ChevronDown,
} from "lucide-react";

export default function Sidebar({ isCollapsed }) {
  const [activeMenu, setActiveMenu] = useState(null);

  const menus = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
    },
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
    {
      name: "Reportes",
      icon: FileText,
    },
    {
      name: "Auditoría",
      icon: Shield,
    },
    {
      name: "Configuración",
      icon: Settings,
      submenu: ["Planes", "Categorías"],
    },
  ];

  const toggleMenu = (menuName) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  return (
    <aside className="h-full bg-gray-900 text-white p-3 transition-all duration-300">
      
      {/* Logo */}
      <div className="mb-6 text-center font-bold text-lg">
        {!isCollapsed ? "Admin Panel" : "AP"}
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-2">
        {menus.map((menu) => {
          const Icon = menu.icon;
          const isOpen = activeMenu === menu.name;

          return (
            <div key={menu.name}>
              
              {/* Item principal */}
              <div
                onClick={() => menu.submenu && toggleMenu(menu.name)}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-800 cursor-pointer transition"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />

                  {!isCollapsed && (
                    <span className="text-sm">{menu.name}</span>
                  )}
                </div>

                {/* Arrow */}
                {!isCollapsed && menu.submenu && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                )}
              </div>

              {/* Submenu */}
              {!isCollapsed && isOpen && menu.submenu && (
                <div className="ml-8 mt-1 flex flex-col gap-1 text-sm text-gray-300">
                  {menu.submenu.map((sub) => (
                    <span
                      key={sub}
                      className="hover:text-white cursor-pointer"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}