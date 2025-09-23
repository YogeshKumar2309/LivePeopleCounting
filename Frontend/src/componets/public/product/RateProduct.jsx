import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { FaStar, FaRegStar } from "react-icons/fa";

const RateProduct = ({ product }) => {
  const productId = product._id;
  const { handleSubmit, control, register, reset } = useForm();
  const [hover, setHover] = useState(0);
  const [loadingSendRating, setLoadingSendRating] = useState(false);

  const onSubmit = (data) => {
    const reviewData = {
      productId,
      rating: data.rating,
      message: data.message,
    };
    console.log(reviewData);
    sendReview(reviewData);
    reset();
  };

  const sendReview = async (formData) => {
    try {
      const res = await fetch("/api/user/private/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(!res.ok) throw Error(data.message);
      toast.success("Review Submitted Successfully");
      setLoadingSendRating(false);
      reset();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoadingSendRating(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-4 border rounded-lg shadow-md w-full max-w-md mx-auto"
    >
      {/*  Star Rating */}
      <Controller
        name="rating"
        control={control}
        defaultValue={0}
        render={({ field }) => (
          <div className="flex items-center space-x-2">
            {[...Array(5)].map((_, i) => {
              const starValue = i + 1;
              return (
                <span
                  key={i}
                  onClick={() => field.onChange(starValue)}
                  onMouseEnter={() => setHover(starValue)}
                  onMouseLeave={() => setHover(0)}
                  className="cursor-pointer"
                >
                  {starValue <= (hover || field.value) ? (
                    <FaStar className="w-7 h-7 text-yellow-400" />
                  ) : (
                    <FaRegStar className="w-7 h-7 text-yellow-400" />
                  )}
                </span>
              );
            })}
          </div>
        )}
      />

      {/* Message Input */}
      <textarea
        {...register("message", { required: true })}
        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
        rows="4"
        placeholder="Write your review here..."
      ></textarea>

      {/* Submit Button */}
      <button
        disabled={loadingSendRating}
        type="submit"
        className=" w-full bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 text-center"
      >
        {loadingSendRating ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};

export default RateProduct;
