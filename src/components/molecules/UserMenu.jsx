import { useState } from "react";
import { ChevronDown, LogOut, Moon, User, Key } from "lucide-react";
import Avatar from "../atoms/Avatar";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Trigger */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 cursor-pointer p-1 rounded-lg hover:bg-gray-100 transition"
      >
        <Avatar src="https://i.pravatar.cc/40" />

        <span className="hidden md:block font-medium text-gray-700">
          Miguel
        </span>

        <ChevronDown
          className={`w-4 h-4 text-gray-600 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-xl p-2 border border-gray-300">
          <ul className="flex flex-col text-sm">

            <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
              <User className="w-4 h-4" />
              Ver perfil
            </li>

            <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
              <Key className="w-4 h-4" />
              Cambiar contraseña
            </li>

            <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
              <Moon className="w-4 h-4" />
              Modo oscuro
            </li>

            <hr className="my-2 text-gray-200" />

            <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-red-50 text-red-500 cursor-pointer">
              <LogOut className="w-4 h-4" />
              Cerrar sesión
            </li>

          </ul>
        </div>
      )}
    </div>
  );
}