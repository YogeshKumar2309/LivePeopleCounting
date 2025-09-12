import { Routes, Route } from "react-router-dom";
import PublicLayout from "./components/layout/PublicLayout";
import AuthLayout from "./components/layout/AuthLayout";
import UserLayout from "./components/layout/UserLayout";
import AdminLayout from "./components/layout/AdminLayout";

import Home from "./pages/public/Home";
import Login from "./pages/auth/Login";
import Favorites from "./pages/user/Favorites";
import Dashboard from "./pages/admin/Dashboard";
import CheckAuth from "./components/common/CheckAuth";
import NotFound from "./pages/pageNotFound/NotFound";
import UnauthPage from "./pages/Unauth/UnauthPage";

const App = () => {
  const isAuthenticated = true; // ✅ Future में state से आएगा
  const user = {
    name: "Yogesh",
    role: "admin", // "admin" या "user"
  };

  return (
    <div className="App">
      <Routes>
        {/* 🌍 Public Route */}
        <Route
          path="/"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <PublicLayout />
            </CheckAuth>
          }
        >
          <Route index element={<Home />} />
        </Route>

        {/* 🔑 Auth Routes */}
        <Route
          path="/login"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route index element={<Login />} />
        </Route>

        <Route
          path="/register"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route index element={<div>Register Page</div>} />
        </Route>

        {/* 👤 User Protected Routes */}
        <Route
          path="/user"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <UserLayout />
            </CheckAuth>
          }
        >
          <Route index element={<div>User Dashboard</div>} />
        </Route>

        <Route
          path="/favorites"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <UserLayout />
            </CheckAuth>
          }
        >
          <Route index element={<Favorites />} />
        </Route>

        {/* 🛠️ Admin Protected Routes */}
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route index element={<Dashboard />} />
        </Route>

        {/* 🚫 Unauthorized Page */}
        <Route path="/unauth-page" element={<UnauthPage />} />

        {/* ❌ 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
