const API_BASE = import.meta.env.VITE_API_BASE;

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const UserUploadProfilePic = ({ onUpload, handleImgLoading }) => {
  const [loading, setLoading] = useState(false);
  const [resError, setResError] = useState(null);
  const [preview, setPreview] = useState(null);
  const [retryFile, setRetryFile] = useState(null);

  const {
    register,
    watch,
    formState: { errors },
  } = useForm();

  const selectedImage = watch("profileImage");

  // ✅ Upload Image Function
  const handleUploadImage = async (file, timeout = 60000) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const controller = new AbortController();
    const signal = controller.signal;
    const timer = setTimeout(() => controller.abort(), timeout);

    try {
      setLoading(true);
      handleImgLoading?.(true);
      setResError(null);

      const res = await fetch(`${API_BASE}/api/user/private/uploadImage`, {
        method: "POST",
        credentials: "include",
        body: formData,
        signal,
      });

      clearTimeout(timer);

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.message || "Upload failed");

      // ✅ Set preview and return image URL to parent
      setPreview(URL.createObjectURL(file));
      onUpload?.(resData.url);
      setRetryFile(null);
    } catch (error) {
      console.error("Upload Error:", error.message);
      setResError(error.message);
      setRetryFile(file);
    } finally {
      setLoading(false);
      handleImgLoading?.(false);
    }
  };

  // ✅ Automatically upload when image selected
  useEffect(() => {
    if (selectedImage && selectedImage[0]) {
      handleUploadImage(selectedImage[0]);
    }
  }, [selectedImage]);

  return (
    <div className="flex flex-col items-center gap-3">
      {/* File input */}
      <label className="text-sm font-medium text-gray-700">
        Upload Profile Picture
      </label>
      <input
        {...register("profileImage", { required: "Profile image is required" })}
        type="file"
        accept="image/*"
        className="w-full border border-gray-300 rounded-md px-3 py-2 mb-1 text-sm"
      />
      {errors.profileImage && (
        <p className="text-red-500 text-sm bg-red-100 px-2 py-1 rounded">
          {errors.profileImage.message}
        </p>
      )}

      {/* Status */}
      {loading && <p className="text-blue-500 text-sm">Uploading...</p>}
      {resError && (
        <div className="text-center">
          <p className="text-red-500 text-sm mb-2">Error: {resError}</p>
          <button
            onClick={() => retryFile && handleUploadImage(retryFile)}
            className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 transition"
          >
            Retry Upload
          </button>
        </div>
      )}
    
    </div>
  );
};

export default UserUploadProfilePic;
