import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItemAsync, updateCartQuantityAsync } from "../../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddToCartBtn = ({ productId, produnctName, AddIcon, RemoveIcon }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart.items);

  const [loading, setLoading] = useState(false);

  // Check if product is already in cart
  const isInCart = cart.some((item) => item.productId === productId);  
  
  const productTitle = produnctName ? produnctName : "Product";

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
        await  dispatch(deleteCartItemAsync({productId}))
           toast.success(<div>
          <span className="bg-red-200 px-2 py-0.5 rounded-lg">{productTitle}</span> Removed from cart</div>);      
      } else {
        // Add item (quantity = 1)
        await dispatch(updateCartQuantityAsync({ productId, quantity: 1 }));
        toast.success(<div>
          <span className="bg-green-200 px-2 py-0.5 rounded-lg">{productTitle}</span> Added to cart</div>);
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
      className={`px-4 py-2 rounded-lg text-white font-semibold transition-all duration-200 ${
        isInCart ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
      }`}
    >
            {loading ? (
        "wait..."
      ) : isInCart ? (
        RemoveIcon ? <RemoveIcon size={12} /> : "Remove from Cart"
      ) : (
        AddIcon ? <AddIcon size={12}/> : "Add to Cart"
      )}
    </button>
  );
};

export default AddToCartBtn;
