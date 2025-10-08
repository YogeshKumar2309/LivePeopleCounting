import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    items: [
      {
        productId: {type: mongoose.Schema.Types.ObjectId, ref: "Product"},
        quantity: Number,
        price: Number,
      }
    ],
    totalAmount: Number,
    paymentMethod: {type: String, default: "cod"},
    status: {type: String, default: "confirmed"},    
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);