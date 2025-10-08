import { Link2, User, Package, Heart } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

const UserProfileList = [
  { id: 1, name: "Profile", link: "/user/profile", icon: <User /> },
  { id: 2, name: "MyOrder", link: "/user/profile/orderDetails", icon: <Package /> },
  { id: 3, name: "Favorites", link: "/user/profile/favorites", icon: <Heart /> },
];

const UserProfile = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="flex flex-wrap md:flex-nowrap bg-amber-50 sticky top-0 z-50 shadow-md p-3 overflow-x-auto">
        {UserProfileList.map((item) => (
          <NavLink
            key={item.id}
            to={item.link}
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg font-semibold whitespace-nowrap
              ${
                isActive
                  ? "bg-amber-200 text-amber-700 shadow-md"
                  : "text-gray-800 hover:text-amber-600 hover:bg-amber-100"
              }`
            }
            end={item.name === "Profile"} // default profile active
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Content */}
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default UserProfile;
