import { imageUploadUtil } from "../config/cloudinary.js";
import { Product } from "../models/product.model.js";

export const uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const b64 = req.file.buffer.toString("base64");
    const url = `data:${req.file.mimetype};base64,${b64}`;
    const result = await imageUploadUtil(url);
    res.status(201).json({
      seccess: true,
      url: result.secure_url,
    });
  } catch (error) {
    console.error(" Error in uploadImage:", error);
  }
};

export const addProduct = async (req, res) => {
  try {
    const { title, desc, category, price, offerPrice, badge, active, image } =
      req.body;

    const newProduct = new Product({
      title,
      desc,
      category,
      price,
      offerPrice,
      badge,
      active,
      image,
    });

    const saveProduct = await newProduct.save();
    res.status(201).json({ success: true, message: "product added successfully",  product: saveProduct });
  } catch (error) {
    console.log("error in addProduct", error);
    res.status(500).json({ success: false, error: "server error" });
  }
};
