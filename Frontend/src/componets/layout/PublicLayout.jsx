import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../public/Footer";
import Header from "../public/Header";
import About from "../public/About";
import Contact from "../user/Contact";


const PublicLayout = () => {
  return (
    <div>
      <nav>
        <Header />
      </nav>
      <main className="min-h-screen">
        <Outlet />
        <About/>
        <Contact/>
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  );
};

export default PublicLayout;
