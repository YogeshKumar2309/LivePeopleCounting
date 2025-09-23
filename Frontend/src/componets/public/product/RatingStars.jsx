import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const RatingStars = ({ rating, totalStars = 5 }) => {
  return (
    <div className="flex items-center space-x-2">
      {/* Stars */}
      {[...Array(totalStars)].map((_, i) => {
        const starValue = i + 1;
        if (rating >= starValue) {
          // Full star
          return <FaStar key={i} className="w-5 h-5 text-yellow-400" />;
        } else if (rating >= starValue - 0.5) {
          // Half star
          return <FaStarHalfAlt key={i} className="w-5 h-5 text-yellow-400" />;
        } else {
          // Empty star
          return <FaRegStar key={i} className="w-5 h-5 text-yellow-400" />;
        }
      })}

      {/* Rating number */}
      <span className="ml-2 text-gray-600">({rating})</span>

      {/* Separator */}
      <span className="text-gray-400">|</span>

      {/* Reviews count */}
      <span className="text-gray-600">127 reviews</span>
    </div>
  );
};

export default RatingStars;
