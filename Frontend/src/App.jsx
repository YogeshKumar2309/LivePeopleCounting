// App.js
import { Routes, Route } from "react-router-dom";
import PublicLayout from "./componets/layout/PublicLayout";
import AuthLayout from "./componets/layout/AuthLayout";
import UserLayout from "./componets/layout/UserLayout";
import AdminLayout from "./componets/layout/AdminLayout";

import Home from "./pages/public/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Favorites from "./pages/user/Favorites";
import Dashboard from "./pages/admin/Dashboard";
import CheckAuth from "./componets/common/CheckAuth";
import NotFound from "./pages/pageNotFound/NotFound";
import UnauthPage from "./pages/Unauth/UnauthPage";
import Productlayout from "./pages/admin/Productlayout";

const App = () => {
  // Authentication state - typically from Context/Redux
  const isAuthenticated = true;
  const user = {
    name: "Yogesh",
    role: "admin", // 'admin' or 'user'
  };

  return (
    <div className="App">
      <Routes>
        {/* Public/Home Route */}
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

        {/* Auth Routes */}
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
          <Route index element={<Register />} />
        </Route>

        {/* User Protected Routes */}
        <Route
          path="/user"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <UserLayout />
            </CheckAuth>
          }
        >
          <Route index element={<div>User Dashboard</div>} />
          <Route path="profile" element={<div>User Profile</div>} />
          <Route path="settings" element={<div>User Settings</div>} />
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

        {/* Admin Protected Routes */}
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="users" element={<div>Manage Users</div>} />
          <Route path="products" element={<Productlayout/>} >
            <Route path="add" element={<div>addProduct</div>} />
          </Route>
          <Route path="people" element={<div>Admin Settings</div>} />
          <Route path="bisnessAnalytics" element={<div>Admin Settings</div>} />
        </Route>

        {/* Unauthorized Page */}
        <Route path="/unauth-page" element={<UnauthPage />} />

        {/* Page Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
