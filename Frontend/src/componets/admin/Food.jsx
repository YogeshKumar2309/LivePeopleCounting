import React, { useState } from "react";

const Food = ({ foods, editProduct }) => {
  return (
    <div className="p-4 sm:max-w-[80vw] m-auto ">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        All Product Lists
      </h2>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead className="bg-gradient-to-r from-amber-100 to-amber-200">
            <tr>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">
                Image
              </th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">
                Badge
              </th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">
                Title
              </th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">
                Category
              </th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">
                Rating
              </th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">
                Price
              </th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">
                Offer Price
              </th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">
                Status
              </th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {foods.map((f, idx) => (
              <tr
                key={idx}
                className="hover:bg-amber-50 transition-all duration-200 border-b border-gray-100"
              >
                <td className="py-3 px-4">
                  <img
                    src={f.image}
                    alt={f.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      f.badge === "Veg"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {f.badge}
                  </span>
                </td>
                <td className="py-3 px-4 font-medium text-gray-900">
                  {f.title}
                </td>

                <td className="py-3 px-4 text-gray-700">{f.category}</td>
                <td className="py-3 px-4">
                  <span className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="font-semibold">{f.rating}</span>
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="line-through text-gray-500">₹{f.price}</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-green-600 font-bold text-lg">
                    ₹{f.offerPrice}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      f.active
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {f.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button
                  onClick={() => editProduct(f)}                  
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium shadow-sm">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {foods.map((f, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden p-4"
          >
            <div className="flex items-center space-x-4">
              <img
                src={f.image}
                alt={f.title}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-lg text-gray-900">{f.title}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      f.badge === "Veg"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {f.badge}
                  </span>
                </div>
                <div className="text-green-600 font-bold mb-2">
                  ₹{f.offerPrice}
                </div>
                <div className="flex justify-between items-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      f.active
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {f.active ? "Active" : "Inactive"}
                  </span>
                  <button 
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Food;
