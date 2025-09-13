import React, { useState } from "react";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    category: "",
       price: "",
    offerPrice: "",
    badge: "Veg",
    active: true,
    img: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0]
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Product:", formData);
    alert("Product Added Successfully!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-center">Add New Product</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Title */}
          <div>
            <label className="block mb-1 text-sm font-medium">Product Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter product title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 text-sm font-medium">Description</label>
            <textarea
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              rows="2"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter product description"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 text-sm font-medium">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="e.g. Dessert"
              required
            />
          </div>

        

          {/* Price & Offer Price */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 text-sm font-medium">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="₹ Price"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Offer Price</label>
              <input
                type="number"
                name="offerPrice"
                value={formData.offerPrice}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="₹ Offer Price"
              />
            </div>
          </div>

          {/* Badge */}
          <div>
            <label className="block mb-1 text-sm font-medium">Badge</label>
            <select
              name="badge"
              value={formData.badge}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-1 text-sm font-medium">Product Image</label>
            <input
              type="file"
              name="img"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          {/* Active */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <label className="text-sm">Active</label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
