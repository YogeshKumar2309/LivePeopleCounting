// import { LiaRupeeSignSolid } from "react-icons/lia";
// import {
//   FaStar,
//   FaHeart,
//   FaRegHeart,
//   FaCartPlus,
//   FaCartArrowDown,
// } from "react-icons/fa";
// import { memo, useMemo } from "react";
// import { ArrowRight } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { toast } from "react-hot-toast";
// import { motion } from "framer-motion";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import "react-lazy-load-image-component/src/effects/blur.css";
// import AddToCartBtn from "../common/AddToCartBtn";

// const FoodProduct = memo(
//   ({ item, handleOnLike, isAuthenticated, likedProducts }) => {
//     const navigate = useNavigate();
//     const location = useLocation();

//     const isLiked = useMemo(
//       () => likedProducts.includes(item?._id),
//       [likedProducts, item?._id]
//     );

//     if (!item) return null;

//     const discountPercent = item?.price
//       ? Math.round(((item.price - item.offerPrice) / item.price) * 100)
//       : 0;

//     const discountColor = discountPercent > 50 ? "bg-green-500" : "bg-red-400";

//     const handleFavoriteClick = () => {
//       if (!isAuthenticated) {
//         toast.error("Login first");
//         navigate("/login", { state: { from: location.pathname } });
//         return;
//       }
//       handleOnLike(item?._id);
//     };

//     const handleSeeDetails = () => {
//       navigate(`/productsDetails/${item?._id}`);
//     };

//     return (
//       <motion.div
//         whileHover={{ scale: 1.05, y: -5 }}
//         transition={{ type: "spring", stiffness: 200, damping: 15 }}
//         className="w-[110px] h-[170px] sm:w-[280px] sm:h-[300px] overflow-hidden 
//                  rounded-2xl bg-white border border-gray-200 shadow-md 
//                  hover:shadow-xl flex flex-col"
//       >
//         {/* Image Section */}
//         <div className="h-[64%] sm:h-[55%] w-full relative border-b border-gray-200 overflow-hidden bg-gray-200 flex items-center justify-center">
//           <LazyLoadImage
//             src={item?.image || ""}
//             alt={`${item?.title || "Food Item"} - ${item?.category || ""}`}
//             effect="blur"
//             className="w-full h-full object-contain transition-all duration-700"
//           />
//           {item?.badge && (
//             <span
//               className={`absolute top-3 right-3 ${
//                 item?.badge === "veg" ? "bg-green-500" : "bg-red-500"
//               } text-white text-[6px] sm:text-xs font-semibold px-3 py-1 rounded-md`}
//             >
//               {item.badge}
//             </span>
//           )}

//           <motion.h5
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="font-bold mb-2 text-white bg-rose-600 sm:text-lg 
//                      px-3 py-1 rounded-md absolute bottom-0 left-3 text-[6px]"
//           >
//             {item?.category && <span>{item.category}</span>}
//           </motion.h5>

//           {item?.rating > 0 && (
//             <span
//               className="rounded-full ps-1 pr-2 py-0.5 flex text-rose-700 items-center gap-1 
//                        absolute bottom-0 right-3 font-semibold mb-2 sm:text-lg text-[6px]  bg-yellow-500"
//             >
//               <FaStar /> ({item.rating})
//             </span>
//           )}
//         </div>

//         {/* Content */}
//         <div className="ps-3 pr-4 pb-4 pt-0.5 flex flex-col justify-between sm:h-[45%] ">
//           <div className="div1 bg-gradient-to-b from-stone-900 via-gray-500 to-black bg-clip-text text-transparent text-2xl font-extrabold">
//             <p onClick={handleSeeDetails} className=" ">
//               {item.title.length > 16
//                 ? `${item.title.slice(0, 16)}...`
//                 : item.title}
//             </p>{" "}
//           </div>
//           <div className="div2 flex items-center justify-between text-[6px] sm:text-lg">
//             <span className="flex items-center gap-2 sm:text-2xl">
//               {/* Offer Price */}
//               <span className="font-bold text-stone-800 sm:text-2xl">
//                 <span className="text-gray-700">₹</span>
//                 {item?.offerPrice || "-"}
//               </span>

//               {/* Original Price */}
//               {item?.price && (
//                 <del className="text-gray-400 text-sm sm:text-base">
//                   ₹{item.price}
//                 </del>
//               )}

//               {/* Discount */}
//               {item?.offerPrice && item?.price && (
//                 <span className="text-green-600 font-semibold text-sm sm:text-base">
//                   (
//                   {Math.round(
//                     ((item.price - item.offerPrice) / item.price) * 100
//                   )}
//                   % off)
//                 </span>
//               )}
//             </span>

//             <span className="px-2">
//               <motion.button
//                 whileTap={{ scale: 0.8 }}
//                 onClick={handleFavoriteClick}
//                 aria-label={
//                   isLiked ? "Remove from favorites" : "Add to favorites"
//                 }
//                 className="text-2xl transition transform hover:scale-110 text-[12px] sm:text-[28px]"
//               >
//                 {isLiked ? (
//                   <FaHeart className="text-red-500" />
//                 ) : (
//                   <FaRegHeart className="text-gray-500" />
//                 )}
//               </motion.button>
//             </span>
//           </div>

//           <div className="div3">
//             <div className="flex justify-between">
//               <button
//                 onClick={handleSeeDetails}
//                 className="group flex items-center sm:gap-2 sm:text-sm font-medium 
//                        sm:text-amber-600 sm:bg-stone-50 border border-blue-200 sm:px-3 sm:py-1.5 
//                        rounded-lg hover:bg-amber-600 hover:text-white hover:shadow-md 
//                        transition-all duration-300 text-[6px] text-white bg-amber-600 px-2 py-1"
//               >
//                 See Details
//                 <ArrowRight className="sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1 h-2" />
//               </button>
//               <AddToCartBtn
//                 productId={item._id}
//                 produnctName={item.title}
//                 AddIcon={FaCartPlus}
//                 RemoveIcon={FaCartArrowDown}
//               />
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     );
//   }
// );

// export default FoodProduct;
import { LiaRupeeSignSolid } from "react-icons/lia";
import {
  FaStar,
  FaHeart,
  FaRegHeart,
  FaCartPlus,
  FaCartArrowDown,
} from "react-icons/fa";
import { memo, useMemo } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import AddToCartBtn from "../common/AddToCartBtn";

const FoodProduct = memo(({ item, handleOnLike, isAuthenticated, likedProducts }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLiked = useMemo(() => likedProducts.includes(item?._id), [likedProducts, item?._id]);

  if (!item) return null;

  const discountPercent = item?.price
    ? Math.round(((item.price - item.offerPrice) / item.price) * 100)
    : 0;

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
      className="w-full sm:w-72 md:w-80 lg:w-96 h-auto overflow-hidden 
                 rounded-2xl bg-white border border-gray-200 shadow-md hover:shadow-xl 
                 flex flex-col transition-all duration-300"
    >
      {/* Image Section */}
      <div className="h-44 sm:h-56 md:h-64 w-full relative overflow-hidden bg-gray-50 flex items-center justify-center">
        <LazyLoadImage
          src={item?.image || ""}
          alt={`${item?.title || "Food Item"} - ${item?.category || ""}`}
          effect="blur"
          className="w-full h-full object-contain transition-all duration-700 hover:scale-105"
        />

        {/* Veg/Non-Veg Badge */}
        {item?.badge && (
          <span
            className={`absolute top-3 right-3 ${
              item?.badge === "veg" ? "bg-green-500" : "bg-red-500"
            } text-white text-xs sm:text-sm font-semibold px-3 py-1 rounded-md`}
          >
            {item.badge}
          </span>
        )}

        {/* Category Label */}
        {item?.category && (
          <motion.h5
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-semibold text-white bg-gradient-to-r from-pink-500 via-rose-400 to-blue-600 
                       sm:text-sm px-2 py-1 rounded-md absolute bottom-2 left-3"
          >
            {item.category}
          </motion.h5>
        )}

        {/* Rating */}
        {item?.rating > 0 && (
          <span className="rounded-full px-2 py-0.5 flex items-center gap-1 
                           absolute bottom-2 right-3 font-semibold text-xs sm:text-sm bg-yellow-400 text-rose-700">
            <FaStar /> {item.rating}
          </span>
        )}
      </div>

      {/* Content Section */}
      <div className="px-3 py-3 flex flex-col justify-between flex-1">
        {/* Title */}
        <p
          onClick={handleSeeDetails}
          className="text-base md:text-lg font-bold cursor-pointer bg-gradient-to-r from-pink-500 via-rose-400 to-blue-600 bg-clip-text text-transparent truncate"
        >
          {item.title.length > 22 ? `${item.title.slice(0, 22)}...` : item.title}
        </p>

        {/* Price & Like */}
        <div className="flex items-center justify-between mt-2 text-sm md:text-base pr-4 sm:pr-0">
          <span className="flex items-center gap-2">
            <span className="font-bold text-gray-800 flex items-center gap-1">
              <LiaRupeeSignSolid /> {item?.offerPrice || "-"}
            </span>
            {item?.price && <del className="text-gray-400">₹{item.price}</del>}
            {item?.offerPrice && item?.price && (
              <span className="text-green-600 font-semibold">
                ({discountPercent}% off)
              </span>
            )}
          </span>

          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={handleFavoriteClick}
            aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
            className="text-lg transition-transform hover:scale-110"
          >
            {isLiked ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart className="text-gray-500" />
            )}
          </motion.button>
        </div>

        {/* Actions */}
        <div className="mt-3 flex flex-col sm:flex-row sm:justify-between gap-2">
          <button
            onClick={handleSeeDetails}
            className="group flex items-center justify-center sm:justify-start gap-2 text-sm font-medium 
                       text-white bg-amber-600 hover:bg-amber-700 px-3 py-1.5 rounded-lg transition-all duration-300"
          >
            See Details
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <AddToCartBtn
            productId={item._id}
            produnctName={item.title}
            AddIcon={FaCartPlus}
            RemoveIcon={FaCartArrowDown}
          />
        </div>
      </div>
    </motion.div>
  );
});

export default FoodProduct;
