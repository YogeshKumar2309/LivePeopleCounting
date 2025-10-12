import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartItemAsync,
  updateCartQuantityAsync,
} from "../../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddToCartBtn = ({ productId, produnctName, AddIcon, RemoveIcon }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  // Check if product is already in cart
  const cartItem = cartItems.find((item) => item.productId === productId);
  const isInCart = !!cartItem;

  const productTitle = produnctName || "Product";

  const { isAuthenticated } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const handleCartAction = async () => {
    if (!isAuthenticated) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      if (isInCart) {
        //  Remove item
        await dispatch(deleteCartItemAsync({ productId }));
        toast.success(
          <div>
            <span className="bg-red-200 px-2 py-0.5 rounded-lg">
              {productTitle}
            </span>{" "}
            Removed from cart
          </div>
        );
      } else {
        // Add item (quantity = 1)
        await dispatch(updateCartQuantityAsync({ productId, quantity: 1 }));
        toast.success(
          <div>
            <span className="bg-green-200 px-2 py-0.5 rounded-lg">
              {productTitle}
            </span>{" "}
            Added to cart
          </div>
        );
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error("Cart error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCartAction}
      disabled={loading}
      className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
        isInCart
          ? " hover:bg-red-400 text-rose-500 border-1"
          : " hover:bg-green-400 text-green-500 border-1"
      }`}
    >
      {loading ? (
        <sapn className="text-md">wait...</sapn>
      ) : isInCart ? (
        RemoveIcon ? (
          <>
            <div className="relative">
              <RemoveIcon size={18} />
              <div className="absolute -right-6 -top-4 bg-rose-500 rounded-full px-2  text-md text-white border-rose-600 border-1">
                {" "}
                {cartItem.quantity}
              </div>
            </div>
          </>
        ) : (
          "Remove from Cart"
        )
      ) : AddIcon ? ( 
          <AddIcon size={18} />     
      ) : (
        "Add to Cart"
      )}
    </button>
  );
};

export default AddToCartBtn;
