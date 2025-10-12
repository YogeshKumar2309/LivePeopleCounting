import RatingStars from "./RatingStars";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const Reviews = ({ reviews }) => {
  const totalReviews = reviews.length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6 text-center sm:text-left">
        Customer Reviews
      </h3>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border border-gray-200 rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row sm:items-start gap-4"
          >
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-lg sm:text-xl">
                  {review.username?.charAt(0).toUpperCase() || "A"}
                </span>
              </div>
            </div>

            {/* Review Content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 flex-wrap">
                <span className="font-medium text-gray-900 truncate">
                  {review.username || "Anonymous User"}
                </span>

                {/* RatingStars */}
                <div className="mt-1 sm:mt-0">
                  <RatingStars
                    rating={review.rating}
                    totalStars={5}
                    totalReviews={totalReviews}
                  />
                </div>
              </div>

              {/* Message */}
              <p className="text-gray-700 break-words">{review.message}</p>

              {/* Time */}
              <p className="text-sm text-gray-500 mt-2">
                {dayjs(review.createdAt).fromNow()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
