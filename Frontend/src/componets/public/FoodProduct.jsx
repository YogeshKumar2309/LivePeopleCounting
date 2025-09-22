import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaStar } from "react-icons/fa";
import { memo, useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { ArrowRight } from "lucide-react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const cachedImages = {}; // global cache for images

const FoodProduct = memo(
  ({ item, handleOnLike, isAuthenticated, likedProducts }) => {
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();

    const location = useLocation();
    const isLiked = likedProducts.includes(item?.id);

    useEffect(() => {
      if (item?.image && cachedImages[item.image]) {
        // agar image pehle load ho chuki hai
        setLoaded(true);
      }
    }, [item?.image]);

    if (!item) return null;

    const discountPercent = item?.price
      ? Math.round(((item.price - item.offerPrice) / item.price) * 100)
      : 0;

    const handleLoad = () => {
      setLoaded(true);
      cachedImages[item.image] = true; // mark as loaded in cache
    };

    const handleFavoriteClick = () => {
      if (!isAuthenticated) {
        toast.error("login first");
        navigate("/login", { state: { from: location.pathname } });
        return;
      }
      handleOnLike(item?.id);
    };

    const handleSeeDetails = () =>{
       navigate(`/productsDetails/${item?.id}`)
   
    }
    return (
      <div
        className="w-[240px] h-[330px] sm:w-[280px] sm:h-[320px] overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col"
        style={{ willChange: "transform" }}
      >
        {/* Image with placeholder */}
        <div className="h-[55%] w-full relative border-b border-gray-200 overflow-hidden bg-gray-200">
          {!loaded && (
            <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
          )}
          <img
            src={item?.image || ""}
            alt={item?.title || "Food Item"}
            loading="lazy"
            decoding="async"
            className={`w-full h-full object-cover transition-opacity duration-700 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={handleLoad}
            width={360}
            height={231}
          />
          {item?.badge &&
            (item?.badge === "Veg" ? (
              <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-md">
                {item.badge}
              </span>
            ) : (
              <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md">
                {item.badge}
              </span>
            ))}

          <h5
            className="font-bold  mb-2 
           bg-red-500 text-white text-lg px-3 py-1 rounded-md  absolute bottom-0 left-3
           "
          >
            {item?.title || "No Title"}
          </h5>
          {item?.rating && (
            <h5
              className="bg-yellow-400 rounded-full ps-1 pr-2 py-0.5 flex text-red-500 items-center gap-1 absolute bottom-0 right-3
              font-semibold mb-2 
            text-lg  
              
              "
            >
              <FaStar /> {item.rating}
            </h5>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col justify-between h-[45%]">
          <div>
            <p className="mb-3">
              <button
                onClick={handleSeeDetails}
                className="group flex items-center gap-2 text-sm font-medium text-amber-600 border border-blue-200 px-3 py-1.5 rounded-lg 
               hover:bg-amber-600 hover:text-white hover:shadow-md transition-all duration-300"
              >
                See Details
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </p>

            <div className="flex items-center justify-between gap-2 mb-2 p-0.5">
              {item?.category && (
                <span className="bg-gray-700 text-white text-xs px-2 py-1 rounded">
                  {item.category}
                </span>
              )}

              <button
                onClick={handleFavoriteClick}
                className="text-2xl transition transform hover:scale-110"
              >
                {isLiked ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart className="text-gray-500" />
                )}
              </button>
            </div>
          </div>

          <div>
            <p className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <LiaRupeeSignSolid />
                <del className="text-gray-400">{item?.price || "-"}</del>
                <span className="font-semibold text-gray-900">
                  {item?.offerPrice || "-"}
                </span>
              </span>
              {discountPercent > 0 && (
                <span className="bg-red-400 text-white text-xs font-semibold px-2 py-1 rounded">
                  {discountPercent}% OFF
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    );
  }
);

export default FoodProduct;
