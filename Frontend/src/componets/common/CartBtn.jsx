import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { updateCartQuantityAsync } from "../../features/cart/cartSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CartBtn = ({ checkoutQuantity, setCheckoutQuantity, productId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const quantity = useSelector(
    (state) =>
      state.cart.itmes?.find((item) => item.productId === productId)
        ?.quantity || 0
  );
  const { isAuthenticated } = useSelector((state) => state.auth);

  function checkAuth() {
    if (!isAuthenticated) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }
  }

  const handleDecrease = () => {
    checkAuth();
    if (checkoutQuantity > 0) {
      dispatch(
        updateCartQuantityAsync({ productId, quantity: checkoutQuantity - 1 })
      );
      setCheckoutQuantity(checkoutQuantity - 1);
    }
  };

  const handleIncrease = () => {
    checkAuth();
    dispatch(
      updateCartQuantityAsync({ productId, quantity: checkoutQuantity + 1 })
    );
    setCheckoutQuantity(checkoutQuantity + 1);
  };

  useEffect(() => {
    setCheckoutQuantity(quantity);
  }, [quantity]);

  return (
    <div className="flex items-center gap-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full shadow-lg overflow-hidden">
      <button
        onClick={handleDecrease}
        className="px-4 py-3 text-white hover:bg-white/20 transition border-r border-white/30"
      >
        -
      </button>

      <button className="flex items-center gap-2 px-6 py-3 text-white hover:bg-white/10 transition">
        <ShoppingCart size={20} />
        {checkoutQuantity}
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
