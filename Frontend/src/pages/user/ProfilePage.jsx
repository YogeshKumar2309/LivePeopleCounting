const API_BASE = import.meta.env.VITE_API_BASE;
import { useEffect, useState } from "react";
import { FaEdit, FaShoppingCart, FaHeart, FaBox } from "react-icons/fa";
import UserUploadProfilePic from "../../componets/common/UserUploadProfilePic";
import {toast} from "react-hot-toast";

const EditProfileModal = ({ user, onClose, onSave,setEditProfile  }) => {
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [avatar, setAvatar] = useState(user.avatar || null);
  const [uploadImgLoading, setUploadImgLoading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(null);

  const handleSubmit = () => {
    const updated = { name, email, avatar: uploadedUrl || avatar };
    postUserProfile(updated)
      .then(() => onSave(updated))   
    onClose();
  };

    const postUserProfile = async (updated) => {
    try {
      const res = await fetch(`${API_BASE}/api/user/private/postUserProfile`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updated),
      });

      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

      toast.success("Profile updated successfully!");
      setEditProfile(false);
    } catch (error) {
      console.error("Failed to update user profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg flex flex-col gap-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <FaEdit /> Edit Profile
        </h2>

        {/* Avatar Upload Section */}
        <div className="flex flex-col items-center gap-2">
          <img
            src={uploadedUrl || avatar}
            alt="avatar"
            className="w-24 h-24 rounded-full object-cover border-2 border-green-500"
          />

          {/* UploadImage Component */}
          <UserUploadProfilePic
            onUpload={(url) => setUploadedUrl(url)}
            handleImgLoading={setUploadImgLoading}
          />
        </div>

        {/* Name & Email Inputs */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          className="border px-3 py-2 rounded-md w-full"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border px-3 py-2 rounded-md w-full"
        />

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            disabled={uploadImgLoading} //  disable jab tak upload ho raha ho
            className={`px-4 py-2 rounded-md text-white ${
              uploadImgLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            onClick={handleSubmit}
          >
            {uploadImgLoading ? "Uploading..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [edtiUserData, setEditUserData] = useState({});
  const [editProfile, setEditProfile] = useState(false);

  const fetchUserProfile = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/user/private/getuserProfile`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      const user = {
        name: data.user.fullName,
        email: data.user.email,
        avatar: data.user.avatar,
        orders: data.totalOrders,
        wishlist: data.wishlistCount,
        cart: data.cartCount,
        confirmedOrders: data.confirmedOrders,
        deliveredOrders: data.deliveredOrders,
        cancelOrders: data.cancelOrders,
      };
      setUser(user);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      toast.error("Unable to fetch user profile. Please try again later.");
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [edtiUserData]);

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
          <button
            onClick={() => setEditProfile(true)}
            className="mt-2 flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            <FaEdit />
            Edit Profile
          </button>
          {editProfile && (
            <EditProfileModal
              user={user}
              onClose={() => setEditProfile(false)}
              onSave={(updatedUser) => setEditUserData(updatedUser)}
              setEditProfile={setEditProfile}
            />
          )}
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
