import { imageUploadUtil } from "../config/cloudinary.js";
import { Product } from "../models/product.model.js";

//upload image to cloudinary
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

//add product
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


//get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    console.log(products);
    
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log("error in getProducts",error);
    res.status(500).json({ success: false, error: "server error" });
  }
};