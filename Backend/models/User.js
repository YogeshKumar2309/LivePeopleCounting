import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: {type: String, default: "https://res.cloudinary.com/dfifffuai/image/upload/v1760111326/products/fc5tlbxlb95vwnp6cag9.jpg"},
  role: { type: String, default: 'user' },
},{timestamps: true});

export const User = mongoose.model("User", userSchema);
