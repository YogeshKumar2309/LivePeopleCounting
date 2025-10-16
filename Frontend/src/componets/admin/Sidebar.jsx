import { Link, NavLink } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import { BarChart2, Box, ChevronLeft, LogOut,  MessageCircle,  ShoppingBag, User } from "lucide-react";

const Sidebar = ({ onClose }) => {
  const navList = [
    { id: 1, link: "/admin/products", icon: <Box size={20} className="mr-3" />, label: "Products" },
    { id: 2, link: "/admin/users", icon: <User size={20} className="mr-3" />, label: "Users" },
    { id: 3, link: "/admin/orders", icon: <ShoppingBag size={20} className="mr-3" />, label: "Order" },   
    { id: 4, link: "/admin/userMessage", icon: <MessageCircle size={20} className="mr-3" />, label: "Order" },   
    { id: 5, link: "/admin/bisnessAnalytics", icon: <BarChart2 size={20} className="mr-3" />, label: "Analytics" },   
   ];

  const handleLogout = useLogout();

  return (
    <div className="w-64 sm:w-72">
    <div className="fixed top-0 left-0 w-64 sm:w-72 h-full bg-white shadow-lg flex flex-col px-4 py-6 z-50">
      {/* Logo & Close Button */}
      <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-3">
        <Link
          to="/admin"
          className="font-extrabold text-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 text-transparent bg-clip-text"
        >
          Y-Dessets
        </Link>
        <button
          onClick={() => onClose(false)}
          className="p-2 rounded-full hover:bg-gray-200 transition"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto">
        {navList.map((item) => (
          <NavLink
            key={item.id}
            to={item.link}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 mb-2 text-lg rounded-lg transition-all duration-300 font-medium ${
                isActive
                  ? "bg-amber-400 text-white shadow-md"
                  : "text-gray-700 hover:bg-amber-300 hover:text-gray-900"
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-lg font-semibold rounded-lg text-gray-700 hover:bg-red-500 hover:text-white transition-all duration-300"
        >
          <LogOut size={20} className="mr-3" />
          Logout
        </button>
      </div>
    </div>
    </div>
  );
};

export default Sidebar;
