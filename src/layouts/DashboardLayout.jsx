import { useState } from "react";
import Sidebar from "../components/organisms/Sidebar";
import Navbar from "../components/organisms/Navbar";

export default function DashboardLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-[250px_1fr] grid-rows-[70px_1fr]">
      
      {/* Sidebar */}
      <div className="row-span-2">
        <Sidebar isOpen={isOpen} />
      </div>

      {/* Navbar */}
      <Navbar toggleSidebar={() => setIsOpen(!isOpen)} />

      {/* Content */}
      <main className="p-6 bg-gray-100 overflow-auto">
        {children}
      </main>
    </div>
  );
}