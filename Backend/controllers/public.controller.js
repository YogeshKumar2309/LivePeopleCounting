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