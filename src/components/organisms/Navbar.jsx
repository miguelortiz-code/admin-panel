import { Menu, Moon, Sun } from "lucide-react";
import SearchBar from "../molecules/SearchBar";
import NotificationBell from "../molecules/NotificationBell";
import UserMenu from "../molecules/UserMenu";

export default function Navbar({ toggleSidebar }) {

  return (
    <header className="grid grid-cols-[auto_1fr_auto] items-center px-4 bg-white shadow h-17.5">
      
      {/* LEFT */}
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* CENTER */}
      <div className="flex justify-center">
        <SearchBar />
      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-end gap-3">
        <NotificationBell />

        <UserMenu />
      </div>
    </header>
  );
}