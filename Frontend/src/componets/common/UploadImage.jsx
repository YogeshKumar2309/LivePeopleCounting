import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const UploadImage = ({ onUpload, product }) => {
  const [loading, setLoading] = useState(false);
  const [resError, setResError] = useState(null);
  const [preview, setPreview] = useState(product?.image || null);
  const {
    register,
    watch,
    formState: { errors },
  } = useForm();

  const selectedImage = watch("image");

  useEffect(() => {
    const uploadImage = async () => {
      if (selectedImage && selectedImage[0]) {
        const formData = new FormData();
        formData.append("image", selectedImage[0]);

        try {
          setLoading(true);
          setResError(null);

          const res = await fetch("/api/admin/uploadImage", {
            method: "POST",
            body: formData,
          });

          const resData = await res.json();
          if (!res.ok) {
            throw new Error(resData.message);
          }
          setPreview(URL.createObjectURL(selectedImage[0]));     

          if (onUpload) {
           onUpload(resData.url);
          }
        } catch (error) {
          console.error(" Upload Error:", error.message);
          setResError(error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    uploadImage();
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
