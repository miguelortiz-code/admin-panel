import Button from "../atoms/Button";
import SearchBar from "../molecules/SearchBar";

export default function Navbar({ toggleSidebar }) {
  return (
    <header className="flex items-center justify-between px-4 bg-white shadow">
      <Button onClick={toggleSidebar} className="md:hidden">
        ☰
      </Button>

      <SearchBar />

      <div>🔔</div>
    </header>
  );
}