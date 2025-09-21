import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export const Favorite = mongoose.model("Favorite", favoriteSchema);