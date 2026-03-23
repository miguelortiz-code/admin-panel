import { Link } from "react-router-dom";

export default function Sidebar({ isOpen }) {
  return (
    <aside
      className={`
        bg-gray-900 text-white p-4
        transition-all duration-300
        ${isOpen ? "block" : "hidden"} 
        md:block
      `}
    >
      <h2 className="text-xl font-bold mb-6">Admin</h2>

      <nav className="flex flex-col gap-3">
        <Link to="/admin/dashboard">Dashboard</Link>
        <Link to="/admin/clientes">Clientes</Link>
        <Link to="/admin/servicios">Servicios</Link>
        <Link to="/admin/reportes">Reportes</Link>
        <Link to="/admin/auditoria">Auditoría</Link>
      </nav>
    </aside>
  );
}