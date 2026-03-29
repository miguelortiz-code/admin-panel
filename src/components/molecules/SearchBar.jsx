import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative w-full max-w-xs md:max-w-md">
      <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />

      <input
        type="text"
        placeholder="Buscar..."
        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-xl outline-none cursor-pointer"
      />
    </div>
  );
}