const API_BASE = import.meta.env.VITE_API_BASE;

import React, { useEffect, useState } from "react";
import { Heart,  Trash2, AlertCircle } from "lucide-react";
import { toggleFavoriteAsync } from "../../features/liked/likedSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddToCartBtn from "../../componets/common/AddToCartBtn";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [removingId, setRemovingId] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      setError(null);
      const res = await fetch(
        `${API_BASE}/api/user/private/getProfileFavorite`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();

      if (data.success) {
        setFavorites(data.favorites);
      } else {
        setError(data.message || "Failed to load favorites");
      }
    } catch (err) {
      setError("Unable to connect. Please check your internet connection.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (productId) => {
    setRemovingId(productId);
    try {
      const resultAction = await dispatch(toggleFavoriteAsync(productId));

      //checking action success or not
      if (toggleFavoriteAsync.fulfilled.match(resultAction)) {
        //wihout refetch remove favorite component
        setFavorites((prev) =>
          prev.filter((item) => item.productId !== productId)
        );
      } else {
        console.error("Failed to remove favorite:", resultAction.payload)
      }
    } catch (err) {
      console.error("Error removing favorite:", err);
    } finally {
      setRemovingId(null);
    }
  };
 

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 min-h-screen">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 border border-gray-200"
              >
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6 min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-red-900 mb-1">
              Error Loading Favorites
            </h3>
            <p className="text-red-700">{error}</p>
            <button
              onClick={fetchFavorites}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Heart className="w-8 h-8 text-red-500 fill-red-500" />
          <h1 className="text-3xl font-bold text-gray-900">My Favorites</h1>
        </div>
        <p className="text-gray-600">
          {favorites?.length === 0
            ? "Start adding items to your favorites"
            : `${favorites.length} ${
                favorites.length === 1 ? "item" : "items"
              } saved`}
        </p>
      </div>

      {/* Empty State */}
      {favorites?.length === 0 ? (
        <div className="bg-gray-50 rounded-2xl p-12 text-center">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No favorites yet
          </h3>
          <p className="text-gray-600 mb-6">
            Items you favorite will appear here for quick access
          </p>
          <button 
          onClick={()=> navigate("/products")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Start Shopping
          </button>
        </div>
      ) : (
        /* Favorites Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((item) => (
            <div
              key={item?._id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
            >
              {/* Product Image Placeholder */}
              <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 h-48 flex items-center justify-center">
                {/* Product Image + Icon */}
                <div className="relative h-48 w-full overflow-hidden rounded-xl">
                  {/* Background Image */}
                  <img
                    src={item?.productId?.image}
                    alt={item?.productId?.title}
                    className="absolute inset-0 w-full h-full object-cove opacity-80"
                  />

                  {/* Overlay Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-9xl text-white opacity-10 pointer-events-none">
                      🛍️
                    </span>
                  </div>

                  {/* Remove Favorite Button */}
                  <button
                    onClick={() => handleRemoveFavorite(item?.productId)}
                    disabled={removingId === item?._id}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors disabled:opacity-50"
                    title="Remove from favorites"
                  >
                    {removingId === item?._id ? (
                      <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Trash2 className="w-5 h-5 text-red-500" />
                    )}
                  </button>
                </div>

                <button
                  onClick={() => handleRemoveFavorite(item?.productId)}
                  disabled={removingId === item?._id}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors disabled:opacity-50"
                  title="Remove from favorites"
                >
                  {removingId === item?._id ? (
                    <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Trash2 className="w-5 h-5 text-red-500" />
                  )}
                </button>
              </div>

              {/* Product Details */}
              <div className="p-5">
                <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                  {item?.productId?.title}
                </h3>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-bold text-gray-900">
                    ₹{item?.productId?.offerPrice.toLocaleString("en-IN")}
                  </span>
                  {item?.productId?.price && (
                    <span className="text-sm text-gray-500 line-through">
                      ₹{item?.productId?.price.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>

                {/* Stock Status */}
                {item?.productId?.active !== undefined && (
                  <div className="mb-4">
                    {item?.productId?.active ? (
                      <span className="text-sm text-green-600 font-medium">
                        In Stock
                      </span>
                    ) : (
                      <span className="text-sm text-red-600 font-medium">
                        Out of Stock
                      </span>
                    )}
                  </div>
                )}

                {/* Action Button */}
              <AddToCartBtn productId={(item?.productId?._id)} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
