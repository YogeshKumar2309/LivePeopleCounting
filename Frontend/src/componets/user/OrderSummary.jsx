import { Package } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCartActiveAsync,
  updateCartQuantityAsync,
} from "../../features/cart/cartSlice";
import { useEffect } from "react";

const OrderSummary = ({onTotalChange}) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const increaseQty = (productId, quantity) => {
    dispatch(updateCartQuantityAsync({ productId, quantity: quantity + 1 }));
  };

  const decreaseQty = (productId, quantity) => {
    if (quantity > 1) {
      dispatch(updateCartQuantityAsync({ productId, quantity: quantity - 1 }));
    }
  };

  const getTotal = () =>
    cart.reduce(
      (acc, item) =>
        item.isActive ? acc + item.productDetails.price * item.quantity : acc,
      0
    );

  useEffect(() => {
    const total = getTotal();
    onTotalChange(total); // parent ko value bhejna
  }, [cart]);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center gap-3 mb-6">
        <Package className="w-8 h-8 text-purple-500" />
        <h3 className="text-2xl font-bold text-gray-800">Order Summary</h3>
      </div>
      {cart.map((item) => (
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
            <div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={item.isActive}
                  onChange={() =>
                    dispatch(
                      updateCartActiveAsync({
                        productId: item.productId,
                        isActive: !item.isActive,
                      })
                    )
                  }
                  className="w-4 h-4 accent-purple-600"
                />
                <p
                  className={`font-semibold ${
                    item.isActive
                      ? "text-gray-800"
                      : "text-gray-400 line-through"
                  }`}
                >
                  {item.productDetails.title}
                </p>
              </div>
              <p className="text-sm text-gray-600">
                Quantity:{" "}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => decreaseQty(item.productId, item.quantity)}
                    className="px-2 py-1 bg-amber-200 rounded hover:bg-amber-300"
                  >
                    -
                  </button>
                  <span className="font-medium">{item.quantity}</span>
                  <button
                    onClick={() => increaseQty(item.productId, item.quantity)}
                    className="px-2 py-1 bg-amber-200 rounded hover:bg-amber-300"
                  >
                    +
                  </button>
                </div>
              </p>
            </div>
            <p className="text-xl font-bold text-purple-600">
              <span className="text-sm">{item.quantity}X</span>{" "}
              {item.productDetails.price}{" "}
            </p>
          </div>
        </div>
      ))}
      <div className="border-t-2 border-dashed border-gray-200 pt-4 mt-4">
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold text-gray-700">Total Amount:</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            ₹{getTotal()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
