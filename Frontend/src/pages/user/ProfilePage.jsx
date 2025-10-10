const API_BASE = import.meta.env.VITE_API_BASE;
import { useEffect, useState } from "react";
import { FaEdit, FaShoppingCart, FaHeart, FaBox } from "react-icons/fa";

const ProfilePage = () => {
  const [user, setUser] = useState({});

  const fetchUserProfile = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/user/private/getuserProfile`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);

      const user = {
        name: data.user.fullName,
        email: data.user.email,
        avatar: data.user.avator,
        orders: data.totalOrders,
        wishlist: data.wishlistCount,
        cart: data.cartCount,
        confirmedOrders: data.confirmedOrders,
        deliveredOrders: data.deliveredOrders,
        cancelOrders: data.cancelOrders,
      };
      setUser(user);
    } catch (error) {}
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-4 sm:p-10">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-lg p-6 sm:p-10 flex flex-col sm:flex-row gap-6">
        {/* Left: Avatar and Basic Info */}
        <div className="flex flex-col items-center sm:items-start sm:w-1/3 gap-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-green-500"
          />
          <h2 className="text-xl sm:text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
          <button className="mt-2 flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            <FaEdit />
            Edit Profile
          </button>
        </div>

        {/* Right: Stats */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {/* Orders */}
          <div className="bg-green-100 rounded-xl p-4 flex flex-col items-center justify-center gap-3 shadow-md hover:shadow-lg transition">
            <FaBox className="text-green-600 text-3xl" />

            {/* Total Orders */}
            <p className="text-2xl font-bold">{user.orders || 0}</p>
            <p className="text-gray-700 text-sm">Total Orders</p>

            {/* Status badges */}
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-medium ">
                Current: {user.confirmedOrders || 0}
              </span>
              <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                Delivered: {user.deliveredOrders || 0}
              </span>
              <span className="bg-red-200 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                Cancelled: {user.cancelOrders || 0}
              </span>
            </div>
          </div>

          {/* Wishlist */}
          <div className="bg-pink-100 rounded-xl p-4 flex flex-col items-center justify-center gap-2">
            <FaHeart className="text-pink-600 text-2xl" />
            <p className="text-lg font-semibold">{user.wishlist || 0}</p>
            <p className="text-gray-600 text-sm">Wishlist</p>
          </div>

          {/* Cart */}
          <div className="bg-yellow-100 rounded-xl p-4 flex flex-col items-center justify-center gap-2">
            <FaShoppingCart className="text-yellow-600 text-2xl" />
            <p className="text-lg font-semibold">{user.cart || 0}</p>
            <p className="text-gray-600 text-sm">Cart Items</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
