import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import useLogout from "../../hooks/useLogout";
import { ArrowRight } from "lucide-react";


const Navbar = ({ navList }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {isAuthenticated} = useSelector((state) => state.auth);
  const handleLogout = useLogout();

  return (
    <nav className="bg-white fixed shadow-xsm shadow-stone-300 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <div className="flex-shrink-0 text-2xl font-bold text-yellow-600">
            Y-Desserts
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4 w-full justify-end">
            {navList.map((nav, idx) => (
              <NavLink
                key={idx}
                to={nav.link}
                className={({ isActive }) =>
                  `${isActive ? "bg-amber-500 text-white" : ""} px-4 py-2 rounded-lg font-semibold hover:bg-amber-500 hover:text-white transition`
                }
              >
                {nav.name}
              </NavLink>
            ))}

            {/* Desktop Search Bar */}
            <input
              type="text"
              placeholder="Search desserts..."
              className="ml-4 px-3 py-1 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            />

            {/* Login Button */}
            {isAuthenticated ? (
              <>
            <div className="ms-10">watchlist</div>
            <button
              onClick={handleLogout}
              className={
                `ml-4 px-4 py-2 rounded-lg font-semibold 
                 bg-gradient-to-r from-red-400 to-rose-500 text-whitehover:from-red-700 hover:to-rose-900 transition`
              }
            >
             Logout<ArrowRight className="inline w-4 h-4 ml-2" />
            </button>
            </>
            ) : (
           <NavLink
              to="/login"
              className={({ isActive }) =>
                `ml-4 px-4 py-1 rounded-lg font-semibold border-2 border-blue-700 ${
                  isActive
                    ? "bg-gradient-to-br from-purple-500 via-blue-500 to-rose-400  text-white"
                    : "hover:bg-gradient-to-b from-blue-400 to-yellow-400 hover:text-white"
                } transition`
              }
            >
              Log in
            </NavLink>
            )}
           
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isOpen ? <HiOutlineX className="w-6 h-6" /> : <HiOutlineMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg ">
          <div className="px-4 pt-2 pb-3 space-y-2">
            {navList.map((nav, idx) => (
              <NavLink
              onClick={() => setIsOpen(!isOpen)}
                key={idx}
                to={nav.link}
                className={({ isActive }) =>
                  `${isActive ? "bg-amber-500 text-white" : "text-gray-800"} block px-3 py-2 rounded-md font-semibold hover:bg-amber-500 hover:text-white transition`
                }
              >
                {nav.name}
              </NavLink>
            ))}
               {isAuthenticated ? (
              <>
                 
              <NavLink      
              onClick={() => setIsOpen(!isOpen)}
                to="/user/watchlist"
                className={({ isActive }) =>
                  `${isActive ? "bg-amber-500 text-white" : "text-gray-800"} block px-3 py-2 rounded-md font-semibold hover:bg-amber-500 hover:text-white transition`
                }
              >
                watchlist
              </NavLink>
                </>
                )
                : (
                  ""
                )
                }

            {/* Mobile Search Bar */}
            <input
              type="text"
              placeholder="Search desserts..."
              className="w-full mt-2 px-3 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            />

            {/* Mobile Login Button */}
             {isAuthenticated ? (
              <>               
         
            <button
              onClick={handleLogout}
              className="w-full bg-gradient-to-r from-red-400 to-rose-500 text-white font-semibold py-2 rounded-lg hover:from-red-500 hover:to-rose-600 transition"
            >
             Logout<ArrowRight className="inline w-4 h-4 ml-2" />
            </button>
       
            </>
            ) : (
            <NavLink
              onClick={() => setIsOpen(!isOpen)}
              to="/login"
              className="block mt-2 px-3 py-2 rounded-md font-semibold border-2 border-blue-700 text-center hover:bg-gradient-to-b from-blue-400 to-yellow-400 hover:text-white transition"
            >
              Login
            </NavLink>
            )}            
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
