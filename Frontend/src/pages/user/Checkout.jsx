import {
  Check,
  ShoppingCart,
  CreditCard,
  CheckCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import OrderSummary from "../../componets/user/OrderSummary";
import PaymentOption from "../../componets/user/PaymentOption";
import ConfirmOrder from "../../componets/user/ConfirmOrder";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { confirmOrderAsync } from "../../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("cod");
 const [totalAmount, setTotalAmount] = useState(0);
 
  const steps = [
    { id: 1, label: "Order Summary", icon: ShoppingCart },
    { id: 2, label: "Payment Option", icon: CreditCard },
    { id: 3, label: "Confirm Order", icon: CheckCircle },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNext = () => {
    if (step === 1 && totalAmount === 0 ) {
         toast.error("Please Check at least one Product!");
      return;
    }
    if (step === 2 && !paymentMethod) {
      toast.error("Please Chose a payment option!");
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handleConfirmOrder = async () => {
    try {
     const resultAction = await dispatch(confirmOrderAsync())      ;
     if(confirmOrderAsync.fulfilled.match(resultAction)) {
      toast.success("Order confirmed successfully!");
      navigate("/user/profile/orderSummary")
     } else {
      toast.error("Failed to confirm order!");
     }
    } catch (error) { 
      toast.error(error.message || "Failed to confirm order");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-3">
            Checkout Process
          </h1>
          <p className="text-gray-600 text-lg">
            आपकी खरीदारी पूरी करने के लिए बस कुछ ही कदम बाकी हैं!
          </p>
        </div>

        {/* Stepper */}
        <div className="relative mb-16">
          <div className="flex justify-between items-start">
            {steps.map((s, index) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.id}
                  className="flex-1 flex flex-col items-center relative"
                >
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-8 left-[60%] w-full h-1 -z-10">
                      <div className="h-full bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-700 ease-out ${
                            step > s.id
                              ? "bg-gradient-to-r from-green-400 to-green-500 w-full"
                              : "w-0"
                          }`}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Step Circle */}
                  <div className="relative">
                    <div
                      className={`w-16 h-16 flex items-center justify-center rounded-full transition-all duration-500 transform ${
                        step === s.id
                          ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white scale-110 shadow-2xl shadow-purple-300 animate-pulse"
                          : step > s.id
                          ? "bg-gradient-to-br from-green-400 to-green-500 text-white shadow-lg"
                          : "bg-white border-4 border-gray-200 text-gray-400 shadow"
                      }`}
                    >
                      {step > s.id ? (
                        <Check className="w-7 h-7" strokeWidth={3} />
                      ) : (
                        <Icon className="w-7 h-7" />
                      )}
                    </div>

                    {/* Animated Ring for Active Step */}
                    {step === s.id && (
                      <div className="absolute inset-0 rounded-full border-4 border-purple-300 animate-ping opacity-75"></div>
                    )}
                  </div>

                  {/* Label */}
                  <p
                    className={`mt-4 text-sm md:text-base font-semibold text-center transition-all duration-300 ${
                      step >= s.id ? "text-gray-800" : "text-gray-400"
                    }`}
                  >
                    {s.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8 min-h-[350px] border border-gray-100">
          {step === 1 && <OrderSummary onTotalChange={setTotalAmount} />}

          {step === 2 && (
            <PaymentOption
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />
          )}

          {step === 3 && <ConfirmOrder 
          paymentMethod={paymentMethod} 
          totalAmount={totalAmount}/>}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4">
          <button
            className="px-8 py-4 bg-gray-300 text-gray-700 rounded-xl shadow-lg hover:bg-gray-400 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed font-semibold transform hover:scale-105 active:scale-95"
            onClick={() => setStep((prev) => prev - 1)}
            disabled={step === 1}
          >
            ← Back
          </button>

          {step < steps.length ? (
            <button
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 font-semibold transform hover:scale-105 active:scale-95 hover:from-purple-600 hover:to-pink-600"
              onClick={handleNext}
            >
              Next Step →
            </button>
          ) : (
            <button
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 font-semibold transform hover:scale-105 active:scale-95 hover:from-green-600 hover:to-emerald-600 flex items-center gap-2"
              onClick={() => handleConfirmOrder() }
            >
              <CheckCircle className="w-5 h-5" />
              Confirm Order 🎉
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
