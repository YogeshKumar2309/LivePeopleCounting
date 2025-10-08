import { CheckCircle } from "lucide-react";
import React from "react";

const ConfirmOrder = ({ paymentMethod, totalAmount }) => {
  return (
    <div className="space-y-6 animate-fadeIn text-center">
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-300">
          <CheckCircle className="w-16 h-16 text-white" strokeWidth={2} />
        </div>
      </div>

      <h3 className="text-3xl font-bold text-gray-800">Confirm Your Order</h3>
      <p className="text-gray-600 text-lg">
        अपने order की details को verify करें
      </p>

      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 space-y-3 text-left">
        <div className="flex justify-between">
          <span className="text-gray-600 font-medium">Total Amount:</span>
          <span className="font-bold text-gray-800">₹{totalAmount}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 font-medium">Payment Method:</span>
          <span className="font-bold text-gray-800">
            {paymentMethod === "cod"
              ? "💵 Cash on Delivery"
              : "💳 Online Payment"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 font-medium">Delivery Location:</span>
          <span className="font-bold text-gray-800">
            Pickup from our restaurant
          </span>
        </div>
      </div>

      {/* <div className="pt-4">
        <p className="text-sm text-gray-500">
          ✅ Order confirm करने के बाद आपको confirmation email मिलेगी
        </p>
      </div> */}
    </div>
  );
};

export default ConfirmOrder;
