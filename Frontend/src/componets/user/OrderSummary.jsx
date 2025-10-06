import { Package } from 'lucide-react'

const OrderSummary = ({productQueantity, setProductQunatiy}) => {
  return (
      <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center gap-3 mb-6">
                <Package className="w-8 h-8 text-purple-500" />
                <h3 className="text-2xl font-bold text-gray-800">Order Summary</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                  <div>
                    <p className="font-semibold text-gray-800">Premium Wireless Headphones</p>
                    <p className="text-sm text-gray-600">Quantity: 1</p>
                  </div>
                  <p className="text-xl font-bold text-purple-600">₹2,999</p>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                  <div>
                    <p className="font-semibold text-gray-800">Smart Watch Series 5</p>
                    <p className="text-sm text-gray-600">Quantity: {productQueantity}</p>
                  </div>
                  <p className="text-xl font-bold text-blue-600">₹4,499</p>
                </div>

                <div className="border-t-2 border-dashed border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-semibold text-gray-700">Total Amount:</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">₹7,498</p>
                  </div>
                </div>
              </div>
            </div>
  )
}

export default OrderSummary