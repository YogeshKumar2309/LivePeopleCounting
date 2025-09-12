import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../../componets/admin/AdminNavbar";

const Productlayout = () => {
    const adminNav = [
    {
      id: 1,
      name: 'addProduct',
      link: '/admin/products/add'
    },
  ]
  return (
    <>
      <header className="h-16 flex justify-around border-b-2 border-sky-300 bg-sky-100">
       <AdminNavbar adminNav={adminNav}/>
      </header>
       <Outlet/>
    </>
  );
};

export default Productlayout;
