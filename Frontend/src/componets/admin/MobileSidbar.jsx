import { Link, NavLink } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import { BarChart2, Boxes, ChevronRight, LogOut, MessageCircle, ShoppingBag, User } from "lucide-react";

const MobileSidbar = ({ onClose }) => {
  const navList = [
    {
      id: 1,
      link: "/admin/products",
      icon: <Boxes />,
    },
    {
      id: 2,
      link: "/admin/users",
      icon: <User />,
    },
    {
      id: 3,
      link: "/admin/orders",
      icon: <ShoppingBag />,
    },
    {
      id: 4,
      link: "/admin/userMessage",
      icon: <MessageCircle />,
    },
    {
      id: 5,
      link: "/admin/bisnessAnalytics",
      icon: <BarChart2 />,
    },
  ];

  const handleLogout = useLogout();

  return (
    <div className="w-22 h-screen">
      <div className="fixed">
      <div className="flex items-center justify-between mb-6 border-b border-gray-200 py-3 mx-3 b">
        <Link
          to="/admin"
          className="font-extrabold text-xl bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 text-transparent bg-clip-text"
        >
          YD
        </Link>
        <button
          onClick={() => onClose(true)}
          className="rounded-full hover:bg-gray-200 transition"
        >
          <ChevronRight size={24} />
        </button>
      </div>
      <div className="flex flex-col justify-between h-[80vh]">
        <div>
        {navList.map((li) => (
          <div
            className=" hover:bg-amber-300 hover:transition-colors duration-300 rounded-lg mb-2  ms-2"
            key={li.id}
          >
            <NavLink
              to={li.link}
              className={({ isActive }) =>
                `flex px-4 py-2 capitalize text-lg rounded-lg transition-colors duration-300 ${
                  isActive ? "bg-amber-400 text-white" : ""
                }`
              }
            >
              {li.icon}
            </NavLink>
          </div>
        ))}
        </div>

        <div className=" hover:transition-colors duration-300 rounded-lg font-semibold hover:bg-red-500  transition ms-2 ">
          <NavLink
            to="/"
            onClick={handleLogout}
            className={`flex px-4 py-2 items-center capitalize text-lg rounded-lg transition-colors duration-300 `}
          >
            <LogOut />
          </NavLink>
        </div>
      </div>
      </div>
    </div>
  );
};

export default MobileSidbar;
