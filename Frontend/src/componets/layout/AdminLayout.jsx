import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../admin/Sidebar";


const AdminLayout = () => {
  const [sidebarMenu, setSidebarMenu] = useState(true);
  return (
    <>
      <div className="flex h-screen ">
        {/* Sidebar */}
        {sidebarMenu && (
          <aside className="w-64 hidden sm:block">
            <Sidebar />
          </aside>
        )}

      

          {/* Content */}
          <main className="flex-1 bg-amber-200">
                <Outlet />
          </main>
        </div>

    </>
  );
};

export default AdminLayout;
