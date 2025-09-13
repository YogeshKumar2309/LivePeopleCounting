import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ navList }) => {
  return (
    <div className="flex items-center h-14 justify-between px-2 md:px-6">
      <div>logo</div>

      {/* searchbar */}
      <div className=" px-2">
        <span className="md:hidden">search</span>
        <span className="hidden md:block">
          <input
            type="text"
            className="border rounded-2xl p-0.5"
            placeholder="Search here your favorite food"
          />
        </span>
      </div>

      {/* navLink */}
      <div className="text-black order-2 md:order-0">
        {/* mobile view */}
        <div className="md:hidden">a</div>

        {/* desktop view */}
        <div className="hidden md:block space-x-4">
          {navList.map((nav) => (
            <NavLink
              to={nav.link}
              className={({ isActive }) =>
                `${
                  isActive ? "bg-amber-500 text-white" : ""
                }  px-4 py-2 my-2 rounded-lg font-bold uppercase hover:bg-amber-500 hover:text-white`
              }
            >
              {nav.name}
            </NavLink>
          ))}
        </div>
      </div>

      <div>login</div>
    </div>
  );
};

export default Navbar;
