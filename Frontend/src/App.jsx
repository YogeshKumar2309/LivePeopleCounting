import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "./componets/Footer";
import Header from "./componets/Header";
import MainHero from "./componets/MainHero";
import MainSection from "./componets/MainSection";
import About from "./componets/About";
import Login from "./componets/Login";
import SignUp from "./componets/SignUp";
import Products from "./componets/Products";

// Admin Pages
import AdminHome from "./componets/AdminHome";
import AdminEditProduct from "./componets/AdminEditProduct";
import AdminAnalyse from "./componets/AdminAnalyse";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleLoginSuccess = (admin = false) => {
    setIsLoggedIn(true);
    setIsAdmin(admin);
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/auth/session", {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success && data.user) {
          setIsLoggedIn(true);
          setIsAdmin(data.user.isAdmin || false);
        }
      } catch (err) {
        console.error("Session check failed:", err);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  if (loading) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
        onLogout={handleLogout}
      />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainHero />} />
        <Route
          path="/product"
          element={
            <MainSection>
              <Products />
            </MainSection>
          }
        />
        <Route
          path="/about"
          element={
            <MainSection>
              <About />
            </MainSection>
          }
        />
        <Route
          path="/login"
          element={
            <MainSection>
              <Login onLoginSuccess={handleLoginSuccess} />
            </MainSection>
          }
        />
        <Route
          path="/signup"
          element={
            <MainSection>
              <SignUp onSignupSuccess={handleLoginSuccess} />
            </MainSection>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            isAdmin ? (
              <MainSection>
                <AdminRoutes />
              </MainSection>
            ) : (
              <MainSection>
                <p className="text-center text-danger mt-5">
                  Access Denied 🚫 (Admin only)
                </p>
              </MainSection>
            )
          }
        />

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Footer is common */}
      <Footer />
    </>
  );
};

// Admin ke andar ke routes alag component me
const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<AdminHome />} />
      <Route path="edit-product" element={<AdminEditProduct />} />
      <Route path="analyse" element={<AdminAnalyse />} />
      <Route path="*" element={<Navigate to="/admin" />} />
    </Routes>
  );
};

export default App;
