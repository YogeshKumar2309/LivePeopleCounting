import { Check, CreditCard, Truck, Wallet } from 'lucide-react'
import React from 'react'

const PaymentOption = ({ paymentMethod, setPaymentMethod }) => {
  return (
       <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center gap-3 mb-6">
                <Wallet className="w-8 h-8 text-purple-500" />
                <h3 className="text-2xl font-bold text-gray-800">Payment Option चुनें</h3>
              </div>

              <div className="space-y-4">
                {/* Cash on Delivery */}
                <label
                  className={`flex items-center gap-4 p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    paymentMethod === "cod"
                      ? "border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg"
                      : "border-gray-200 hover:border-green-300 hover:bg-green-50"
                  }`}
                >
                  <input
                                     type="checkbox"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.checked ? "cod" : "")}
                    className="w-6 h-6 text-green-500 rounded focus:ring-2 focus:ring-green-400"
                  />
                  <div className="flex items-center gap-3 flex-1">
                    <Truck className="w-8 h-8 text-green-600" />
                    <div>
                      <p className="font-bold text-gray-800 text-lg">Cash on Delivery (COD)</p>
                      <p className="text-sm text-gray-600">डिलीवरी पर पेमेंट करें - सुरक्षित और आसान</p>
                    </div>
                  </div>
                  {paymentMethod === "cod" && (
                    <Check className="w-6 h-6 text-green-500" strokeWidth={3} />
                  )}
                </label>

                {/* Online Payment */}
                {/* <label
                  className={`flex items-center gap-4 p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    paymentMethod === "online"
                      ? "border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg"
                      : "border-gray-200 hover:border-purple-300 hover:bg-purple-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={paymentMethod === "online"}
                    onChange={(e) => setPaymentMethod(e.target.checked ? "online" : "")}
                    className="w-6 h-6 text-purple-500 rounded focus:ring-2 focus:ring-purple-400"
                  />
                  <div className="flex items-center gap-3 flex-1">
                    <CreditCard className="w-8 h-8 text-purple-600" />
                    <div>
                      <p className="font-bold text-gray-800 text-lg">Online Payment</p>
                      <p className="text-sm text-gray-600">UPI / Card / Net Banking - तुरंत पेमेंट करें</p>
                    </div>
                  </div>
                  {paymentMethod === "online" && (
                    <Check className="w-6 h-6 text-purple-500" strokeWidth={3} />
                  )}
                </label> */}
              </div>

              {!paymentMethod && (
                <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
                  <p className="text-yellow-800 text-sm">⚠️ कृपया आगे बढ़ने के लिए एक payment option चुनें</p>
                </div>
              )}
            </div>
  )
}

export default PaymentOption;