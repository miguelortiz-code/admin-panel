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
  const [activeItem, setActiveItem] = useState("Dashboard");

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
      <div className="flex-1 overflow-y-auto p-2">
        {menuSections.map((section) => (
          <div key={section.title} className="mb-4">
            
            {/* Section title */}
            {!isCollapsed && (
              <p className="text-xs text-gray-400 px-2 mb-2">
                {section.title}
              </p>
            )}

            {/* Items */}
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
                        relative group flex items-center justify-between p-2 rounded-lg cursor-pointer transition
                        ${isActive ? "bg-gray-800" : "hover:bg-gray-800"}
                      `}
                    >
                      {/* Left */}
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />

                        {!isCollapsed && (
                          <span className="text-sm">{item.name}</span>
                        )}
                      </div>

                      {/* Arrow */}
                      {!isCollapsed && item.submenu && (
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      )}

                      {/* TOOLTIP */}
                      {isCollapsed && (
                        <span className="
                          absolute left-14 bg-black text-white text-xs px-2 py-1 rounded
                          opacity-0 group-hover:opacity-100 transition
                          whitespace-nowrap
                        ">
                          {item.name}
                        </span>
                      )}
                    </div>

                    {/* SUBMENU */}
                    {!isCollapsed && isOpen && item.submenu && (
                      <div className="ml-8 mt-1 flex flex-col gap-1 text-sm text-gray-300">
                        {item.submenu.map((sub) => (
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
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}