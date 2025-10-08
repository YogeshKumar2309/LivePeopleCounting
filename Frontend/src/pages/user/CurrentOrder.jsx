import { useEffect, useState } from "react";
import { FaTrashAlt, FaTimesCircle } from "react-icons/fa";
import {toast} from "react-hot-toast"
const API_BASE = import.meta.env.VITE_API_BASE;

const CurrentOrder = () => {
  const [currentOrders, setCurrentOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [cancelledOrders, setCancelledOrders] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // --- Fetch Orders ---
  const fetchAllOrderSummary = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/user/private/getOrder`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();

      if (data.success) {
        setCurrentOrders(
          data.orders.filter(
            ({ delivery }) =>
              delivery?.deliveryStatus === "pending" ||
              delivery?.deliveryStatus === "ready-for-pickup"
          )
        );
        setCompletedOrders(
          data.orders.filter(({ delivery }) => delivery?.deliveryStatus === "picked-up")
        );
        setCancelledOrders(
          data.orders.filter(({ delivery }) => delivery?.deliveryStatus === "cancelled")
        );
      }
    } catch (error) {
      console.error("Error fetching orders:", error.message);
    }
  };

  useEffect(() => {
    fetchAllOrderSummary();
  }, []);

  // --- Cancel Order Placeholder ---
const handleCancelOrder = async (orderId) => {
  if (isProcessing) return; 
  setIsProcessing(true);

  try {
    // API call to cancel order
    const res = await fetch(`${API_BASE}/api/user/private/cancelOrder/${orderId}`, {
      method: "PUT", 
      credentials: "include",
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Failed to cancel order");

    toast.success(`Your order is canceled successfully!`)
    // Re-fetch orders to update UI
    await fetchAllOrderSummary();

  } catch (error) {
    console.error("Error cancelling order:", error.message);
    toast.error("Failed to cancel order. Please try again.");
  } finally {
    setIsProcessing(false);
  }
};


  // --- Delete Order Placeholder ---
  const handleDeleteOrder = async (orderId) => {
    if (isProcessing) return;
    setIsProcessing(true);
    try {
     const res = await fetch(`${API_BASE}/api/user/private/deleteOrder/${orderId}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) {
         throw new Error(data.message || "Failed to delete order");
    }

    toast.success(data.message || `Order ${orderId} deleted successfully!`);

    await fetchAllOrderSummary();
  } catch (error) {
    console.error("Error deleting order:", error.message);
    toast.error("Failed to delete order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // --- Status Badge ---
  const getStatusBadge = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      "ready-for-pickup": "bg-blue-100 text-blue-800",
      "picked-up": "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return (
      <span
        className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${
          colors[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status.replace(/-/g, " ").toUpperCase()}
      </span>
    );
  };

  // --- Render Order ---
  const renderOrderCard = ({ order, delivery }) => {
    const isCurrent = ["pending", "ready-for-pickup"].includes(delivery.deliveryStatus);
    const isDeletable = ["picked-up", "cancelled"].includes(delivery.deliveryStatus);

    return (
      <div
        key={order._id}
        className="relative border border-gray-200 p-6 rounded-lg shadow-lg bg-white hover:shadow-xl transition duration-300"
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">Order #{order._id.slice(-6)}</h3>
            <div className="text-sm text-gray-500">
              Placed on: {new Date(order.createdAt).toLocaleDateString()}
            </div>
          </div>
          {getStatusBadge(delivery.deliveryStatus)}
        </div>

        <hr className="my-4" />

        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700">
          <p>
            <span className="font-semibold">Total:</span>{" "}
            <span className="text-lg font-bold text-red-600">₹{order.totalAmount}</span>
          </p>
          <p>
            <span className="font-semibold">Payment:</span>{" "}
            {order.paymentMethod === "cod" ? "Cash on Delivery" : order.paymentMethod}
          </p>
          <p className="col-span-2">
            <span className="font-semibold">Shop:</span> {delivery.shopLocation.name}
          </p>
          <p className="col-span-2">
            <span className="font-semibold">Address:</span> {delivery.shopLocation.address}
          </p>
        </div>

        {isCurrent && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md text-center">
            <p className="text-xs text-blue-600 font-semibold uppercase">Your Pickup Code</p>
            <p className="text-2xl font-extrabold text-blue-800 tracking-wider">{delivery.pickupCode}</p>
          </div>
        )}

        <h4 className="mt-4 mb-2 font-semibold text-gray-800 border-b pb-1">Items Ordered:</h4>
        <ul className="space-y-1 text-sm text-gray-600">
          {order.items.map((item) => (
            <li key={item._id} className="flex justify-between">
              <span>
                {item.productId.title} <span className="text-xs text-gray-400">({item.quantity} units)</span>
              </span>
              <span className="font-medium">₹{item.productId.price * item.quantity}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 pt-4 border-t flex justify-end space-x-3">
          {isCurrent && (
            <button
              onClick={() => handleCancelOrder(order._id)}
              disabled={isProcessing}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 transition"
            >
              <FaTimesCircle className="mr-2" />
              Cancel Order
            </button>
          )}

          {isDeletable && (
            <button
              onClick={() => handleDeleteOrder(order._id)}
              disabled={isProcessing}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition"
            >
              <FaTrashAlt className="mr-2" />
              Delete History
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-6 md:p-10 bg-gray-50">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 border-b-2 border-indigo-500 pb-2">
          Order History & Status
        </h1>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>Current Orders
        </h2>
        <div className="space-y-6">
          {currentOrders.length === 0 ? (
            <p className="text-gray-500 bg-white p-4 rounded-lg shadow-sm border border-dashed text-center">
              You have no active orders right now.
            </p>
          ) : (
            currentOrders.map(renderOrderCard)
          )}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>Completed Orders
        </h2>
        <div className="space-y-6">
          {completedOrders.length === 0 ? (
            <p className="text-gray-500 bg-white p-4 rounded-lg shadow-sm border border-dashed text-center">
              No completed orders to display.
            </p>
          ) : (
            completedOrders.map(renderOrderCard)
          )}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>Cancelled Orders
        </h2>
        <div className="space-y-6">
          {cancelledOrders.length === 0 ? (
            <p className="text-gray-500 bg-white p-4 rounded-lg shadow-sm border border-dashed text-center">
              No cancelled orders to display.
            </p>
          ) : (
            cancelledOrders.map(renderOrderCard)
          )}
        </div>
      </section>
    </div>
  );
};

export default CurrentOrder;
