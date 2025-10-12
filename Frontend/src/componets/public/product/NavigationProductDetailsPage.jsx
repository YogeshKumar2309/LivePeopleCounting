import { useState } from "react";
import { useSelector } from "react-redux";
import RateProduct from "./RateProduct";
import Reviews from "./Reviews";

const NavigationProductDetailsPage = ({
  product,
  reviews,
  sendReview,
  loadingSendRating,
}) => {
  const [activePage, setActivePage] = useState("details");

  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <>
      {/* Tab Navigation */}
      <div className="pt-16">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 justify-center sm:justify-normal">
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
                  Ingredients :
                </h4>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  {product?.ingredients?.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activePage === "reviews" && <Reviews reviews={reviews} />}

          {activePage === "rateProduct" && (
            <div className="p-6">
              <h1 className="text-2xl font-bold text-center mb-4">
                {product.title}
              </h1>
              <RateProduct
                product={product}
                sendReview={sendReview}
                loadingSendRating={loadingSendRating}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NavigationProductDetailsPage;
