import { NavLink } from "react-router-dom";

const AdminNavbar = ({ adminNav }) => {
  return (
    <>
      <header className="h-16 flex justify-around border-b-2 border-sky-300 bg-sky-100">
        {adminNav.map((li) => (
          <div className="  px-4 py-2 text-md" key={li.id}>
            <NavLink
              to={li.link}
              className={({ isActive }) =>
                `flex px-4 py-2 capitalize  rounded-lg transition-colors hover:transition-colors duration-300 hover:bg-amber-400 ${
                  isActive ? "bg-amber-400 text-white" : ""
                }`
              }
            >
              {li.icon}{li.name}
            </NavLink>
          </div>
        ))}
      </header>
    </>
  );
};

export default AdminNavbar;
