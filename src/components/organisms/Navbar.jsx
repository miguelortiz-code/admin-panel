import { Menu } from "lucide-react";
import SearchBar from "../molecules/SearchBar";
import NotificationBell from "../molecules/NotificationBell";
import UserMenu from "../molecules/UserMenu";

export default function Navbar({ toggleSidebar }) {
  return (
    <header className="flex items-center justify-between px-4 bg-white shadow h-17.5">
      
      {/* LEFT */}
      <div className="flex items-center gap-4 w-full">
        
        {/* Hamburger */}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition md:hidden"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>

        {/* Search */}
        <SearchBar />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3 ml-4">
        <NotificationBell />
        <UserMenu />
      </div>
    </header>
  );
}