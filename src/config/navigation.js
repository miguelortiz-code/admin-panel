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

export const menuSections = [
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
