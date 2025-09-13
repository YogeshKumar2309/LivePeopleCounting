import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../public/Footer";
import Header from "../public/Header";

const PublicLayout = () => {
  return (
    <div>
      <nav>
        <Header />
      </nav>
      <main className="min-h-screen">
        <Outlet />
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  );
};

export default PublicLayout;
