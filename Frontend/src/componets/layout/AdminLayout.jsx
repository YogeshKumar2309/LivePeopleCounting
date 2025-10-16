import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../admin/Sidebar";
import MobileSidbar from "../admin/MobileSidbar";


const AdminLayout = () => {
  const [sidebarMenu, setSidebarMenu] = useState(false);
  return (
    <>
      <div className="flex h-screen ">
        {/* Sidebar */}
        {sidebarMenu ? (
          <aside>
            <Sidebar  onClose={setSidebarMenu}/>
          </aside>
        ): (
          <MobileSidbar onClose={setSidebarMenu}/>
        )}   

          {/* Content */}
          <main className="flex-1">
                <Outlet />
          </main>
        </div>

    </>
  );
};

export default AdminLayout;
