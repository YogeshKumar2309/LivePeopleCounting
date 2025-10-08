import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    pickupType: {
      type: String,
      enum: ["shop-pickup", "home-delivery"],
      default: "shop-pickup",
    },
    shopLocation: {
      name: { type: String, default: "Y-Dessert" },
      address: { type: String, default: "Uttrakhand, India" },
      contact: { type: String, default: "+91-9876543210" },
    },
    deliveryStatus: {
      type: String,
      enum: ["pending", "ready-for-pickup", "picked-up", "cancelled"],
      default: "pending",
    },
    pickupCode: {
      type: String,
      required: true,
    },
    pickupTime: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const Delivery = mongoose.model("Delivery", deliverySchema);
