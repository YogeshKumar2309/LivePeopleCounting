import { Outlet } from "react-router-dom";
import AdminNavbar from "../../componets/admin/AdminNavbar";
import {  PlusSquare, Store } from "lucide-react";


const Productlayout = () => {
    const adminNav = [
    {
      id: 1,
      name: 'AllProductList',
      link: '/admin/products/allProduct',
      icon: <Store/>
    },
    {
      id: 2,
      name: 'addProduct',
      link: '/admin/products/add',
      icon: <PlusSquare/>   
    },
  ]
  return (
    <>
       <AdminNavbar adminNav={adminNav}/>   
       <Outlet/>
    </>
  );
};

export default Productlayout;
