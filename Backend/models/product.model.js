import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String },
    category: {
      type: String,
      enum: ["cakes","pastries","cookies","icecreams","puddings","chocolates","fruit-based","traditional"],
      required: true,
    },
    price: { type: Number, required: true },
    offerPrice: { type: Number },
    badge: {
      type: String,
      enum: ["veg", "non-veg"],
      required: true,
    },
    active: { type: Boolean, default: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
