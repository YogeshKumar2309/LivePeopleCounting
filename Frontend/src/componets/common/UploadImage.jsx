const API_BASE = import.meta.env.VITE_API_BASE;

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const UploadImage = ({ onUpload, product, handleImgLoading }) => {
  const [loading, setLoading] = useState(false);
  const [resError, setResError] = useState(null);
  const [preview, setPreview] = useState(product?.image || null);
  const [retryFile, setRetryFile] = useState(null);

  const {
    register,
    watch,
    formState: { errors },
  } = useForm();

  const selectedImage = watch("image");

  const handleUploadImage = async (file, timeout = 60000) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);

    const controller = new AbortController();
    const signal = controller.signal;
    const timer = setTimeout(() => controller.abort(), timeout); // timeout
    try {
      setLoading(true);
      handleImgLoading(true);
      setResError(null);

      const res = await fetch(`${API_BASE}/api/admin/uploadImage`, {
        method: "POST",
        credentials: "include",
        body: formData,
        signal,
      });

      clearTimeout(timer);     
      
      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.message);
      }
      setPreview(URL.createObjectURL(file));

      if (onUpload) {
        onUpload(resData.url);
        setRetryFile(null);
      }
    } catch (error) {
      console.error(" Upload Error:", error.message);
      setResError(error.message);
      setRetryFile(file);
    } finally {
      setLoading(false);
      handleImgLoading(false);
    }
  };

  useEffect(() => {
    if (selectedImage && selectedImage[0]) {
      handleUploadImage(selectedImage[0]);
    }
  }, [selectedImage]);

  return (
    <>
      <form className="space-y-4 ">
        <label className="block mb-1 text-sm font-medium">Product Image</label>
        <input
          {...register("image", { required: "Image is required" })}
          type="file"
          accept="image/*"
          name="image"
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2"
        />
        {errors.image && (
          <p className="text-red-500 bg-red-200 p-2 rounded-md mt-0.5 text-sm">
            {errors.image.message}
          </p>
        )}
      </form>

      {loading && <p className="text-blue-500 mb-5">Uploading...</p>}
      {resError && <p className="text-red-500">{resError}</p>}
      {resError && (
        <div className="mb-5">
          <p className="text-red-500 mb-2">Error: {resError}</p>
          <button
            onClick={() => retryFile && handleUploadImage(retryFile)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Retry Upload
          </button>
        </div>
      )}
      {preview && (
        <img
          src={preview}
          alt="Uploaded Preview"
          className="mt-3  h-32 object-cover rounded-md mb-5"
        />
      )}
    </>
  );
};

export default UploadImage;
