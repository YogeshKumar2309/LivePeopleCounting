import { useDispatch, useSelector } from "react-redux";
import { ShoppingCart } from "lucide-react";
import {
  fetchCart,
  updateCartQuantityAsync,
} from "../../features/cart/cartSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AddToCartBtn from "./AddToCartBtn";
import { FaCartArrowDown, FaCartPlus } from "react-icons/fa";

const CartBtn = ({ productId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const quantity = useSelector(
    (state) =>
      state.cart.items?.find((item) => item.productId === productId)
        ?.quantity || 0
  );

  const { isAuthenticated } = useSelector((state) => state.auth);

  function checkAuth() {
    if (!isAuthenticated) {
      toast.error("Please login first");
      navigate("/login");
      return false;
    }
    return true;
  }

  const handleDecrease = () => {
    if (!checkAuth()) return;
    if (quantity > 1) {
      dispatch(updateCartQuantityAsync({ productId, quantity: quantity - 1 }));
    }
  };

  const handleIncrease = () => {
    if (!checkAuth()) return;
    dispatch(updateCartQuantityAsync({ productId, quantity: quantity + 1 }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <div className="flex items-center gap-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full shadow-lg overflow-hidden">
      <button
        onClick={handleDecrease}
        className="px-4 py-3 text-white hover:bg-white/20 transition border-r border-white/30"
      >
        -
      </button>

      <button className="flex items-center gap-2 px-6 py-3 text-white hover:bg-white/10 transition">
        <AddToCartBtn
          productId={productId}
          AddIcon={ ShoppingCart}
          RemoveIcon={FaCartArrowDown}
        />
        {quantity}
      </button>

      <button
        onClick={handleIncrease}
        className="px-4 py-3 text-white hover:bg-white/20 transition border-l border-white/30"
      >
        +
      </button>
    </div>
  );
};

export default CartBtn;
