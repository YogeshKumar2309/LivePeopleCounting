// import { LiaRupeeSignSolid } from "react-icons/lia";
// import { FaStar } from "react-icons/fa";
// import { memo, useState, useEffect } from "react";
// import { FaHeart, FaRegHeart } from "react-icons/fa";
// import { ArrowRight } from "lucide-react";
// import { useNavigate, useLocation, Navigate } from "react-router-dom";
// import { toast } from "react-hot-toast";

// const cachedImages = {}; // global cache for images

// const FoodProduct = memo(
//   ({ item, handleOnLike, isAuthenticated, likedProducts }) => {
//     const [loaded, setLoaded] = useState(false);
//     const navigate = useNavigate();

//     const location = useLocation();
//     const isLiked = likedProducts.includes(item?._id);

//     useEffect(() => {
//       if (item?.image && cachedImages[item.image]) {
//         // agar image pehle load ho chuki hai
//         setLoaded(true);
//       }
//     }, [item?.image]);

//     if (!item) return null;

//     const discountPercent = item?.price
//       ? Math.round(((item.price - item.offerPrice) / item.price) * 100)
//       : 0;

//     const handleLoad = () => {
//       setLoaded(true);
//       cachedImages[item.image] = true; // mark as loaded in cache
//     };

//     const handleFavoriteClick = () => {
//       if (!isAuthenticated) {
//         toast.error("login first");
//         navigate("/login", { state: { from: location.pathname } });
//         return;
//       }
//       handleOnLike(item?._id);
//     };

//     const handleSeeDetails = () =>{
//        navigate(`/productsDetails/${item?._id}`)   
//     }

//     return (
//       <div
//         className="w-[180px] h-[300px] sm:w-[280px] sm:h-[320px] overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col"
//         style={{ willChange: "transform" }}
//       >
//         {/* Image with placeholder */}
//         <div className="h-[55%] w-full relative border-b border-gray-200 overflow-hidden bg-gray-200">
//           {!loaded && (
//             <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
//           )}
//           <img
//             src={item?.image || ""}
//             alt={item?.title || "Food Item"}
//             loading="lazy"
//             decoding="async"
//             className={`w-full h-full object-cover transition-opacity duration-700 ${
//               loaded ? "opacity-100" : "opacity-0"
//             }`}
//             onLoad={handleLoad}
//             width={360}
//             height={231}
//           />
//           {item?.badge &&
//             (item?.badge === "veg" ? (
//               <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-md">
//                 {item.badge}
//               </span>
//             ) : (
//               <span className="absolute top-3 right-3 bg-red-500 text-white sm:text-xs font-semibold px-3 py-1 rounded-md text-[10px]">
//                 {item.badge}
//               </span>
//             ))}

//           <h5
//             className="font-bold  mb-2 
//             text-white bg-rose-700 sm:text-lg px-3 py-1 rounded-md  absolute bottom-0 left-3 text-xs 
//            "
//           >
//             {item?.title || "No Title"}
//           </h5>
//           {item?.rating && (
//             <h5
//               className=" rounded-full ps-1 pr-2 py-0.5 flex text-rose-700 items-center gap-1 absolute bottom-0 right-3
//               font-semibold mb-2 
//             sm:text-lg  text-sm  bg-yellow-500            
//               "
//             >
//               <FaStar /> ({item.rating})
//             </h5>
//           )}
//         </div>

//         {/* Content */}
//         <div className="p-4 flex flex-col justify-between h-[45%]">
//           <div>
//             <p className="mb-3">
//               <button
//                 onClick={handleSeeDetails}
//                 className="group flex items-center gap-2 sm:text-sm font-medium sm:text-amber-600 sm:bg-stone-50 border border-blue-200 px-3 py-1.5 rounded-lg 
//                hover:bg-amber-600 hover:text-white hover:shadow-md transition-all duration-300 text-xs text-white bg-amber-600"
//               >
//                 See Details
//                 <ArrowRight className="sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1 h-4" />
//               </button>
//             </p>

//             <div className="flex items-center justify-between gap-2 mb-2 p-0.5">
//               {item?.category && (
//                 <span className="bg-gray-700 text-white text-xs px-2 py-1 rounded">
//                   {item.category}
//                 </span>
//               )}

//               <button
//                 onClick={handleFavoriteClick}
//                 className="text-2xl transition transform hover:scale-110"
//               >
//                 {isLiked ? (
//                   <FaHeart className="text-red-500" />
//                 ) : (
//                   <FaRegHeart className="text-gray-500" />
//                 )}
//               </button>
//             </div>
//           </div>

//           <div>
//             <p className="flex items-center justify-between text-sm sm:text-lg">
//               <span className="flex items-center gap-1">
//                 <LiaRupeeSignSolid />
//                 <del className="text-gray-400">{item?.price || "-"}</del>
//                 <span className="font-semibold text-gray-900">
//                   {item?.offerPrice || "-"}
//                 </span>
//               </span>
//               {discountPercent > 0 && (
//                 <span className="bg-red-400 text-white text-xs font-semibold px-2 py-1 rounded">
//                   {discountPercent}% OFF
//                 </span>
//               )}
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }
// );

// export default FoodProduct;

import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import { memo, useMemo } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const FoodProduct = memo(({ item, handleOnLike, isAuthenticated, likedProducts }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLiked = useMemo(
    () => likedProducts.includes(item?._id),
    [likedProducts, item?._id]
  );

  if (!item) return null;

  const discountPercent = item?.price
    ? Math.round(((item.price - item.offerPrice) / item.price) * 100)
    : 0;

  const discountColor = discountPercent > 50 ? "bg-green-500" : "bg-red-400";

  const handleFavoriteClick = () => {
    if (!isAuthenticated) {
      toast.error("Login first");
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    handleOnLike(item?._id);
  };

  const handleSeeDetails = () => {
    navigate(`/productsDetails/${item?._id}`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="w-[180px] h-[300px] sm:w-[280px] sm:h-[320px] overflow-hidden 
                 rounded-2xl bg-white border border-gray-200 shadow-md 
                 hover:shadow-xl flex flex-col"
    >
      {/* Image Section */}
      <div className="h-[55%] w-full relative border-b border-gray-200 overflow-hidden bg-gray-200 flex items-center justify-center">
        <LazyLoadImage
          src={item?.image || ""}
          alt={`${item?.title || "Food Item"} - ${item?.category || ""}`}
          effect="blur"
          className="w-full h-full object-contain transition-all duration-700"
        />

        {item?.badge && (
          <span
            className={`absolute top-3 right-3 ${
              item?.badge === "veg" ? "bg-green-500" : "bg-red-500"
            } text-white text-xs font-semibold px-3 py-1 rounded-md`}
          >
            {item.badge}
          </span>
        )}

        <motion.h5
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-bold mb-2 text-white bg-rose-700 sm:text-lg 
                     px-3 py-1 rounded-md absolute bottom-0 left-3 text-xs"
        >
          {item?.title || "No Title"}
        </motion.h5>

        {item?.rating && (
          <span
            className="rounded-full ps-1 pr-2 py-0.5 flex text-rose-700 items-center gap-1 
                       absolute bottom-0 right-3 font-semibold mb-2 sm:text-lg text-sm bg-yellow-500"
          >
            <FaStar /> ({item.rating})
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between h-[45%]">
        <div>
          <button
            onClick={handleSeeDetails}
            className="group flex items-center gap-2 sm:text-sm font-medium 
                       sm:text-amber-600 sm:bg-stone-50 border border-blue-200 px-3 py-1.5 
                       rounded-lg hover:bg-amber-600 hover:text-white hover:shadow-md 
                       transition-all duration-300 text-xs text-white bg-amber-600"
          >
            See Details
            <ArrowRight className="sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1 h-4" />
          </button>

          <div className="flex items-center justify-between gap-2 mb-2 p-0.5 mt-2">
            {item?.category && (
              <span className="bg-gray-700 text-white text-xs px-2 py-1 rounded">
                {item.category}
              </span>
            )}

            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={handleFavoriteClick}
              aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
              className="text-2xl transition transform hover:scale-110"
            >
              {isLiked ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart className="text-gray-500" />
              )}
            </motion.button>
          </div>
        </div>

        <div>
          <p className="flex items-center justify-between text-sm sm:text-lg">
            <span className="flex items-center gap-1">
              <LiaRupeeSignSolid />
              <del className="text-gray-400">{item?.price || "-"}</del>
              <span className="font-semibold text-gray-900">
                {item?.offerPrice || "-"}
              </span>
            </span>
            {discountPercent > 0 && (
              <span className={`${discountColor} text-white text-xs font-semibold px-2 py-1 rounded`}>
                {discountPercent}% OFF
              </span>
            )}
          </p>
        </div>
      </div>
    </motion.div>
  );
});

export default FoodProduct;

