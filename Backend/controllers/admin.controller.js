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
      res.status(500).json({
      success: false,
      message: "Failed to upload image. Please try again.",     
    });
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
    res
      .status(201)
      .json({
        success: true,
        message: "product added successfully",
        product: saveProduct,
      });
  } catch (error) {
    console.log("error in addProduct", error);
    res.status(500).json({ success: false, error: "server error" });
  }
};

//get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log("error in getProducts", error);
    res.status(500).json({ success: false, error: "server error" });
  }
};

//upldate product
export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { title, desc, category, price, offerPrice, badge, active, image } =
      req.body;

      console.log("active", active)

    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    existingProduct.title = title;
    existingProduct.desc = desc;
    existingProduct.category = category;
    existingProduct.price = price;
    existingProduct.offerPrice = offerPrice;
    existingProduct.badge = badge;
    existingProduct.active = active;
    existingProduct.image = image;

    const updatedProduct = await existingProduct.save();

    res
      .status(200)
      .json({
        success: true,
        message: "product updated successfully",
        product: updatedProduct,
      });
  } catch (error) {
    console.log("error in addProduct", error);
    res.status(500).json({ success: false, error: "server error" });
  }
};
