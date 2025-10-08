import React, { useEffect, useState } from "react";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, updateCartQuantityAsync } from "../../features/cart/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const getTotal = () =>
  cart.reduce(
    (acc, item) => acc + item.productDetails.price * item.quantity,
    0
  );


  const removeItem = (id) => setCart(cart.filter((item) => item.id !== id));

  const increaseQty = (productId,quantity) => {
    dispatch(updateCartQuantityAsync({ productId, quantity: quantity + 1}))
  }  

  const decreaseQty = (productId,quantity) => {
    if (quantity > 1) {
      dispatch(updateCartQuantityAsync({productId, quantity: quantity -1}))
    }
  }
   

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10 border border-gray-100">
      <h2 className="text-2xl font-extrabold text-amber-600 flex items-center mb-5">
        <ShoppingCart className="w-6 h-6 mr-2" />
        Aapka Cart
      </h2>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-center py-6">Cart khaali hai 😔</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-amber-50 p-3 rounded-lg shadow-sm"
            >
              <div>
                <p className="font-semibold text-gray-800">
                  {item.productDetails.title}
                </p>
                <p className="text-sm text-gray-600">
                  ₹{item.productDetails.price}
                </p>
              </div>

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

              <div className="text-right">
                <p className="font-semibold text-gray-700">
                  ₹{item.productDetails.price * item.quantity}
                </p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 text-sm mt-1 hover:text-red-600 flex items-center"
                >
                  <Trash2 className="w-4 h-4 mr-1" /> Remove
                </button>
              </div>
            </div>
          ))}

          <hr className="my-4" />

          <div className="flex justify-between items-center font-bold text-lg">
            <span>Total:</span>
            <span className="text-amber-700">₹{getTotal()}</span>
          </div>

          <button className="w-full mt-5 py-2.5 text-white font-semibold rounded-lg bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 transition-all shadow-md">
            Checkout Karen
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
