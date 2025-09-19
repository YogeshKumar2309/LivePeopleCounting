import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import { ArrowRight } from "lucide-react";

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
    {
      id: 3,
      name: "Live People",
      link: "/admin/livePeople",
    },
    {
      id: 4,
      name: "Analitics",
      link: "/admin/bisnessAnalytics",
    },
    
  ];

    const handleLogout = useLogout();

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

       <div className=" hover:transition-colors duration-300 rounded-lg font-semibold hover:bg-red-500  transition" >
          <NavLink
            to="/"
               onClick={handleLogout}
            className={
              `flex px-4 py-2 items-center capitalize text-lg rounded-lg transition-colors duration-300 `
            }
          >
          Logout<ArrowRight className="inline ml-1 pt-1" />
          </NavLink>
        </div>

       
      
    </div>
  );
};

export default Sidebar;
