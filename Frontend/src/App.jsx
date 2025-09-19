// App.js
import { Routes, Route } from "react-router-dom";
import PublicLayout from "./componets/layout/PublicLayout";
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
import Products from "./pages/admin/Products";
import AddProduct from "./pages/admin/addProduct";
import Productlayout from "./pages/admin/Productlayout";
import User from "./pages/admin/User";
import LivePeople from "./pages/admin/LivePeople";
import BisnessAnalytics from "./pages/admin/BisnessAnalytics";

import UserProducts from "./pages/public/UserProducts";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginSuccess, logout } from "./features/auth/authSlice";

const App = () => {
  const {isAuthenticated, user} = useSelector((state) => state.auth);
  console.log(isAuthenticated, user);
  
  // Authentication state - typically from Context/Redux
  // const isAuthenticated = false;
  // const user = {
  //   name: "Yogesh",
  //   role: "user", // 'admin' or 'user'
  // };
   const dispatch = useDispatch();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/auth/session", {
          method: "GET",
          credentials: "include", // session cookie bhejega
        });
        const data = await res.json();
        console.log("data",data);
        console.log("data.user",data.user);
        

        if (res.ok && data.success) {
          dispatch(loginSuccess({ user: data.user}));
        } else {
          dispatch(logout());
        }
      } catch (err) {
        dispatch(logout());
      }
    };

    checkSession();
  }, [dispatch]);


  return (
    <div className="App">
       <Toaster />
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
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="products" element={<UserProducts/>} />
          <Route path="about" element={<About/>} />
          <Route path="contact" element={<Contact/>} />
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
          <Route path="favorites" element={<Favorites />} />
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
          <Route path="users" element={<User />} />
          <Route path="products" element={<Productlayout />}>
            <Route index element={<h1>comming soon Dashboard</h1>} />
            <Route path="add" element={<AddProduct />} />
            <Route path="allProduct" element={<Products />} />
          </Route>
          <Route path="livePeople" element={<LivePeople />} />
          <Route path="bisnessAnalytics" element={<BisnessAnalytics />} />
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
