import { Product } from "../models/product.model.js";

export const getAllHomeProduct = async (req, res) => {
  try {
    const products = await Product.find().limit(12);
       const formattedProducts = products.map((p) => ({
      id: p._id,            // MongoDB ka id
      title: p.title,
      desc: p.desc,
      category: p.category,
      badge: p.badge,
      price: p.price,
      offerPrice: p.offerPrice,
      image: p.image,        
      rating: p.rating || "4.5",
    }));

      res.status(200).json({ success: true, products:formattedProducts });
  } catch (error) {
    console.log("error in getAllHomeProduct", error);
    res.status(500).json({ success: false, error: "server error" });
    }
}

//get product details
export const getProductDetails = async (req, res) => {
  try {
    const { productId } = req.query;
    const products = await Product.find({ _id: productId});
    if(!products) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
      res.status(200).json({ success: true, products });
  } catch (error) {
    console.log("error in getAllHomeProduct", error);
    res.status(500).json({ success: false, error: "server error" });
    }
}