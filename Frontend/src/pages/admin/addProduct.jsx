import React, { useState } from "react";
import { useForm } from "react-hook-form";
import UploadImage from "../../componets/common/UploadImage";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-hot-toast';

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [resError, setResError] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleImageUpload = (url) => {
    setImageUrl(url);
  };

  const onSubmitHandler = async (data) => {
    try {
      setLoading(true);

      const payload = {
        title: data.title,
        desc: data.desc,
        category: data.category,
        price: data.price,
        offerPrice: data.offerPrice,
        badge: data.badge,
        active: data.active,
        image: imageUrl,
      };

      const res = await fetch("/api/admin/addProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.message);
      }
      setLoading(false);
      setResError(null);
      toast.success(resData.message);
      navigate("/admin/products/allProduct", {
        state: { msg: resData.message },
      });
    } catch (error) {
      setLoading(false);
      console.error("error", error.message);
      setResError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-center">Add New Product</h2>

        <UploadImage onUpload={handleImageUpload} />

        <form className="space-y-4" onSubmit={handleSubmit(onSubmitHandler)}>
          {/* Title */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Product Title
            </label>
            <input
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 2,
                  message: "Title must be at least 2 characters long",
                },
              })}
              type="text"
              name="title"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter product title"
            />
            {errors.title && (
              <p className="text-red-500 bg-red-200 p-2 rounded-md mt-0.5 text-sm">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Description
            </label>
            <textarea
              {...register("desc", {
                required: "Description is required",
                minLength: {
                  value: 2,
                  message: "Description must be at least 2 characters long",
                },
                maxLength: {
                  value: 500,
                  message: "Description must be at most 500 characters",
                },
              })}
              name="desc"
              rows="2"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter product description"
            />
            {errors.desc && (
              <p className="text-red-500 bg-red-200 p-2 rounded-md mt-0.5 text-sm">
                {errors.desc.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 text-sm font-medium">Category</label>
            <input
              {...register("category", {
                required: "Category is required",
                minLength: {
                  value: 2,
                  message: "Category must be at least 2 characters long",
                },
                maxLength: {
                  value: 50,
                  message: "Category must be at most 50 characters",
                },
              })}
              type="text"
              name="category"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="e.g. Dessert"
            />
            {errors.category && (
              <p className="text-red-500 bg-red-200 p-2 rounded-md mt-0.5 text-sm">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Price & Offer Price */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 text-sm font-medium">Price</label>
              <input
                {...register("price", {
                  required: "Price is required",
                })}
                type="number"
                name="price"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="₹ Price"
              />
              {errors.price && (
                <p className="text-red-500 bg-red-200 p-2 rounded-md mt-0.5 text-sm">
                  {errors.price.message}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">
                Offer Price
              </label>
              <input
                {...register("offerPrice", {
                  required: "Offer Price is required",
                })}
                type="number"
                name="offerPrice"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="₹ Offer Price"
              />
              {errors.offerPrice && (
                <p className="text-red-500 bg-red-200 p-2 rounded-md mt-0.5 text-sm">
                  {errors.offerPrice.message}
                </p>
              )}
            </div>
          </div>

          {/* Badge */}
          <div>
            <label className="block mb-1 text-sm font-medium">Badge</label>
            <select
              {...register("badge")}
              name="badge"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
            </select>
          </div>

          {/* Active */}
          <div className="flex items-center gap-2">
            <input
              {...register("active")}
              type="checkbox"
              name="active"
              className="w-4 h-4"
            />
            <label className="text-sm">Active</label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!imageUrl || loading}
            className={`w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-md  transition
              ${
                !imageUrl || loading
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              }
              
              `}
          >
            {loading ? "Submitting..." : "Add Product"}
          </button>
        </form>

        {resError && (
          <p className="text-red-500 bg-red-200 p-2 rounded-md mt-3 text-center">
            {resError}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
