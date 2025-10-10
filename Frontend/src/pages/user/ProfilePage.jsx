
import { FaEdit, FaShoppingCart, FaHeart, FaBox } from "react-icons/fa";

const ProfilePage = () => {
  const user = {
  name: "Yogesh Kumar",
  email: "yogesh@example.com",
  avatar: "",
  orders: 12,
  wishlist: 5,
  cart: 3,
};
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-4 sm:p-10">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-6 sm:p-10 flex flex-col sm:flex-row gap-6">
        
        {/* Left: Avatar and Basic Info */}
        <div className="flex flex-col items-center sm:items-start sm:w-1/3 gap-4">
          <img
            src={user.avatar || "https://res.cloudinary.com/dfifffuai/image/upload/v1760111326/products/fc5tlbxlb95vwnp6cag9.jpg"}
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
          <div className="bg-green-100 rounded-xl p-4 flex flex-col items-center justify-center gap-2">
            <FaBox className="text-green-600 text-2xl" />
            <p className="text-lg font-semibold">{user.orders || 0}</p>
            <p className="text-gray-600 text-sm">Orders</p>
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
