import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaStar } from "react-icons/fa";
import { memo, useState } from "react";

const FoodProduct = memo(({ item }) => {
  const [loaded, setLoaded] = useState(false);

  if (!item) return null;

  const discountPercent = item?.price
    ? Math.round(((item.price - item.offerPrice) / item.price) * 100)
    : 0;

  return (
    <div
      className="w-[360px] h-[420px] overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col"
      style={{ willChange: "transform" }}
    >
      {/* Image with placeholder */}
      <div className="h-[55%] w-full relative border-b border-gray-200 overflow-hidden bg-gray-200">
        {!loaded && (
          <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
        )}
        <img
          src={item?.img || ""}
          alt={item?.title || "Food Item"}
          loading="lazy"
          decoding="async"
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setLoaded(true)}
          width={360}
          height={231}
        />
        {item?.badge && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md">
            {item.badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between h-[45%]">
        <div>
          <h5 className="font-bold text-lg mb-2">{item?.title || "No Title"}</h5>
          <p className="text-gray-500 text-sm mb-2">{item?.desc || "No Description"}</p>
          <div className="flex items-center gap-2 mb-2">
            {item?.category && (
              <span className="bg-gray-700 text-white text-xs px-2 py-1 rounded">
                {item.category}
              </span>
            )}
            {item?.rating && (
              <span className="text-yellow-500 flex items-center gap-1 text-sm">
                <FaStar /> {item.rating}
              </span>
            )}
          </div>
        </div>

        <div>
          <p className="flex items-center justify-between">
            <span className="flex items-center gap-1">
              <LiaRupeeSignSolid />
              <del className="text-gray-400">{item?.price || "-"}</del>
              <span className="font-semibold text-gray-900">{item?.offerPrice || "-"}</span>
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
});

export default FoodProduct;
