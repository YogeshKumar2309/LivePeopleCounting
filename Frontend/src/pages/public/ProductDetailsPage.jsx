const API_BASE = import.meta.env.VITE_API_BASE;

import React, { useEffect, useState } from "react";
import { Star, Share2, ShoppingCart } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import {
  fetchFavorites,
  fetchProductDetails,
  toggleFavorite,
  toggleFavoriteAsync,
} from "../../features/liked/likedSlice";
import ShereProduct from "../../componets/public/product/ShereProduct";
import RatingStars from "../../componets/public/product/RatingStars";
import NavigationProductDetailsPage from "../../componets/public/product/NavigationProductDetailsPage";
import CartBtn from "../../componets/common/CartBtn";
import { updateCartQuantityAsync } from "../../features/cart/cartSlice";

const ProductDetails = () => {
  const [togleShare, setTogleShare] = useState(false);
  const [loadingSendRating, setLoadingSendRating] = useState(false);
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    productDetails: product,
    loadingProductDetails,
    likedProducts,
  } = useSelector((state) => state.liked);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const isLiked = product && likedProducts.includes(productId);

  const [reviews, setReviews] = useState([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [avgRating, setAvgRating] = useState(0);

  const fetchReviewData = async () => {
    try {
      const res = await fetch(
        `${API_BASE}/api/user/getReviews?productId=${productId}`
      );
      const data = await res.json();
      setReviews(data.reviews);
      setTotalReviews(data.totalReviews);
      setAvgRating(data.avgRating);
    } catch (error) {}
  };

  // Send review
  const sendReview = async (formData) => {
    try {
      const res = await fetch(`${API_BASE}/api/user/private/review`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw Error(data.message);
      fetchReviewData();
      setLoadingSendRating(false);
      return true;
    } catch (error) {
      console.log(error);
      setLoadingSendRating(false);
      return false;
    }
  };

  useEffect(() => {
    fetchReviewData();
  }, []);

  // Fetch single product
  useEffect(() => {
    if (productId) {
      dispatch(fetchProductDetails(productId));
      dispatch(fetchFavorites());
    }
  }, [productId, dispatch]);

  const handleFavoriteClick = () => {
    if (!isAuthenticated) {
      toast.error("Please login first");
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    dispatch(toggleFavorite(productId));
    dispatch(toggleFavoriteAsync(productId));
  };

  //handle buy btn
  const handleBuyBtn = (productId) => {
    if (!isAuthenticated) {
      toast.error("Please login first");
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
     dispatch(updateCartQuantityAsync({ productId, quantity:1}))
    navigate(`/user/checkout`);
  };

  if (loadingProductDetails || !product) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">
            Loading product details...
          </p>
        </div>
      </div>
    );
  }

  const discount = Math.round(
    ((product.price - product.offerPrice) / product.price) * 100
  );

  return (
    <>
      <div className="min-h-screen bg-gray-50 ">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center space-x-2 py-4 text-sm">
              <span
                className="text-gray-500 hover:text-blue-600"
                onClick={() => navigate(-1)}
              >
                product
              </span>
              <span className="text-gray-400">/</span>
              <span className="text-gray-500">ProductsDetiails</span>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">{product.title}</span>
            </nav>
          </div>
        </div>

        {/* Main */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:grid lg:grid-cols-2 lg:gap-12 ">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-sceen object-cover"
          />

          <div className="mt-8 lg:mt-0 space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.title}
            </h1>
            <div className="flex items-center space-x-4">
              <RatingStars
                rating={avgRating}
                totalStars={5}
                totalReviews={reviews.length}
              />
            </div>

            {product.badge && (
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {product.badge}
              </div>
            )}

            <p className="text-gray-700 leading-relaxed">{product.desc}</p>

            <div className="space-y-2">
              <div className="flex items-baseline space-x-3">
                <span className="text-3xl font-bold text-gray-900">
                  ₹{product.offerPrice}
                </span>
                <span className="text-xl text-gray-500 line-through">
                  ₹{product.price}
                </span>
                <span className="text-lg font-medium text-green-600">
                  ({discount}% off)
                </span>
              </div>
              <p className="text-sm text-gray-600">Inclusive of all taxes</p>
            </div>

            <div
              className={`flex items-center space-x-2 ${
                product.active ? "text-green-600" : "text-red-600"
              }`}
            >
              <div
                className={`w-3 h-3 rounded-full ${
                  product.active ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
              <span className="font-medium">
                {product.active ? "In Stock" : "Out of Stock"}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6 p-4">
              {/* Like + Share buttons container */}
              <div className="flex items-center gap-4 justify-end sm:justify-start relative">
                {/* Heart/Like Button */}
                <button
                  onClick={handleFavoriteClick}
                  className="flex items-center justify-center w-14 h-14 rounded-xl border-2 border-gray-300 bg-stone-50 hover:bg-red-100 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 hover:border-red-400"
                >
                  {isLiked ? (
                    <FaHeart className="w-6 h-6 text-red-600" />
                  ) : (
                    <FaRegHeart className="w-6 h-6 text-red-400" />
                  )}
                </button>

                {/* Share Button with positioned popup */}
                <div className="relative">
                  <button
                    onClick={() => setTogleShare(!togleShare)}
                    className={`flex items-center justify-center w-14 h-14 rounded-xl border-2 transition-all duration-300 shadow-md transform hover:scale-105 ${
                      togleShare
                        ? "bg-amber-500 border-amber-600 shadow-xl"
                        : "bg-white border-gray-300 hover:bg-amber-100 hover:border-amber-400"
                    }`}
                  >
                    <Share2
                      className={`w-6 h-6 ${
                        togleShare ? "text-white" : "text-gray-700"
                      }`}
                    />
                  </button>

                  {/* Share popup positioned below share button */}
                  {togleShare && (
                    <div className="absolute top-full left-0 mt-2 z-10">
                      <ShereProduct />
                    </div>
                  )}
                </div>
              </div>

              {/* Cart & Order buttons container */}
              <div className="flex flex-row gap-3 w-full sm:w-auto">
                {/* Cart Button Container - Fixed for mobile */}
                <div className="w-full sm:w-auto">
                  <div className="flex justify-center sm:block">
                    <CartBtn productId={product._id} />
                  </div>
                </div>

                {/* Order Now Button - Reduced height */}
                <button
                  onClick={() => handleBuyBtn(product._id)}
                  className="flex items-center justify-center gap-3 h-15 px-6 rounded-2xl
                  bg-gradient-to-r from-red-500 via-pink-600 to-rose-700 
                  text-white font-extrabold text-lg uppercase tracking-wider 
                  shadow-2xl shadow-red-300/50 
                  transition-all duration-500 
                  hover:scale-[1.02] hover:shadow-red-400/80 
                  hover:from-red-600 hover:via-pink-700 hover:to-rose-800 
                  active:scale-[0.98] 
                  w-full sm:w-auto"
                >
                  <span className="text-xl animate-pulse">🍰</span>
                  <span>Order Now</span>
                </button>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              <hr className="border-t border-gray-300 my-2" />
              Listed on:{" "}
              {product.createdAt
                ? new Date(product.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "N/A"}
            </div>
          </div>
        </div>
        {/* //Product Navigation */}
      </div>
      <div className="px-8 min-h-screen bg-gray-50">
        <NavigationProductDetailsPage
          loadingSendRating={loadingSendRating}
          sendReview={sendReview}
          reviews={reviews}
          product={product}
          totalReviews={totalReviews}
        />
      </div>
    </>
  );
};

export default ProductDetails;
