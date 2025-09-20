import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String },
  category: { type: String },
  price: { type: Number, required: true },
  offerPrice: { type: Number },
  badge: { type: String },
  active: { type: Boolean, default: true },
  image: { type: String, required: true },
}, { timestamps: true });

export const Product = mongoose.model("Product", productSchema);
