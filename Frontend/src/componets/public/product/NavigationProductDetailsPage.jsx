import React, { useState } from "react";
import RatingStars from "./RatingStars"; // path अपने project के अनुसार adjust करो
import { useSelector } from "react-redux";
import RateProduct from "./RateProduct";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const NavigationProductDetailsPage = ({ product, reviews }) => {
  const [activePage, setActivePage] = useState("details");
  const { isAuthenticated } = useSelector((state) => state.auth);

  const totalReviews = reviews.length;

  return (
    <>
      {/* Tab Navigation */}
      <div className="mt-16">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActivePage("details")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activePage === "details"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Product Details
            </button>
            <button
              onClick={() => setActivePage("specifications")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activePage === "specifications"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActivePage("reviews")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activePage === "reviews"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Reviews ({reviews.length})
            </button>
            {isAuthenticated && (
              <button
                onClick={() => setActivePage("rateProduct")}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activePage === "rateProduct"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Rate this Product
              </button>
            )}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="py-8">
          {activePage === "details" && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Product Details
              </h3>
              <div className="prose max-w-none text-gray-700">
                <p>{product?.desc || "No description available."}</p>
                <h4 className="font-semibold text-gray-900 mt-6">
                  Key Features:
                </h4>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>Premium quality materials</li>
                  <li>Durable construction</li>
                  <li>Easy to use and maintain</li>
                  <li>Excellent value for money</li>
                </ul>
              </div>
            </div>
          )}

          {activePage === "specifications" && (
            <div className="space-y-6 mr-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium text-gray-900">Brand</span>
                    <span className="text-gray-700">
                      {product?.brand || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium text-gray-900">Model</span>
                    <span className="text-gray-700">
                      {product?.model || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium text-gray-900">Weight</span>
                    <span className="text-gray-700">
                      {product?.weight || "N/A"}
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium text-gray-900">
                      Dimensions
                    </span>
                    <span className="text-gray-700">
                      {product?.dimensions || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium text-gray-900">Color</span>
                    <span className="text-gray-700">
                      {product?.color || "Multiple"}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium text-gray-900">Warranty</span>
                    <span className="text-gray-700">
                      {product?.warranty || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePage === "reviews" && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Customer Reviews
              </h3>
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border border-gray-200 rounded-lg p-6"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium">
                          {review.username?.charAt(0).toUpperCase() || "A"}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium text-gray-900">
                            {review.username || "Anonymous User"}
                          </span>
                          <RatingStars rating={review.rating} totalStars={5} totalReviews={totalReviews} />
                        </div>
                        <p className="text-gray-700">{review.message}</p>
                        <p className="text-sm text-gray-500 mt-2">
                         {dayjs(review.createdAt).fromNow()}
                        </p>                     
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activePage === "rateProduct" && (
            <div className="p-6">
              <h1 className="text-2xl font-bold text-center mb-4">{product.title}</h1>
              <RateProduct product={product} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NavigationProductDetailsPage;
