import { useState } from "react";
import Sidebar from "../components/organisms/Sidebar";
import Navbar from "../components/organisms/Navbar";

export default function DashboardLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className="h-screen grid transition-all duration-300"
      style={{
        gridTemplateColumns: isCollapsed ? "80px 1fr" : "250px 1fr",
        gridTemplateRows: "70px 1fr",
      }}
    >
      {/* Sidebar */}
      <div className="row-span-2">
        <Sidebar isCollapsed={isCollapsed} />
      </div>

      {/* Navbar */}
      <Navbar toggleSidebar={() => setIsCollapsed(!isCollapsed)} />

      {/* Content */}
      <main className="p-6 bg-gray-100 overflow-auto">
        {children}
      </main>
    </div>
  );
}