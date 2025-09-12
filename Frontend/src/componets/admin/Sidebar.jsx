import React from "react";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  const navList = [
    {
      id: 1,
      name: "products",
      link: "/admin/products",
    },
    {
      id: 2,
      name: "user",
      link: "/admin/users",
    },
  ];

  return (
    <div className="">
      <div className="text-3xl text-center mb-3 bg-gradient-to-b from-blue-500 p-2 font-extrabold h-16 items-center text-red-50">
        <Link to="/admin">Logo</Link>
      </div>
      {navList.map((li) => (
        <div className=" hover:bg-amber-300 hover:transition-colors duration-300 rounded-lg mb-2" key={li.id}>
          <NavLink
            to={li.link}
            className={({ isActive }) =>
              `flex px-4 py-2 capitalize text-lg rounded-lg transition-colors duration-300 ${
                isActive ? "bg-amber-400 text-white" : ""
              }`
            }
          >
            {li.name}
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
