import { Moon, Sun } from "lucide-react";

export default function ThemeToggle({ isCollapsed, darkMode, toggle }) {
  return (
    <div
      onClick={toggle}
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
  );
}