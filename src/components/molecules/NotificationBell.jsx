import { Bell } from "lucide-react";
import Badge from "../atoms/Badge";

export default function NotificationBell() {
  return (
    <div className="relative cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition">
      <Bell className="w-5 h-5 text-gray-600" />
      <Badge count={3} />
    </div>
  );
}