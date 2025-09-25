import { Product } from "../models/product.model.js";
import Review from "../models/review.model.js";
import mongoose from "mongoose";

export const getAllHomeProduct = async (req, res) => {
  try {
    const products = await Product.aggregate([
      { $limit: 8 },
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "productId",
          as: "reviews",
        },
      },
      {
        $addFields: {
          averageRating: {
            $avg: "$reviews.rating",
          },
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          desc: 1,
          category: 1,
          price: 1,
          offerPrice: 1,
          badge: 1,
          active: 1,
          image: 1,
          rating: { $round: [{$ifNull: ["$averageRating", 0]},1]},
        },
      },
    ]);
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log("error in getAllHomeProduct", error);
    res.status(500).json({ success: false, error: "server error" });
  }
};

//get product details
export const getProductDetails = async (req, res) => {
  try {
    const { productId } = req.query;
    const products = await Product.find({ _id: productId });
    if (!products) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log("error in getAllHomeProduct", error);
    res.status(500).json({ success: false, error: "server error" });
  }
};

//getReview
export const getReview = async (req, res) => {
  try {
    const productId = req.query.productId;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid productId" });
    }

    const reviewData = await Review.aggregate([
      {
        $match: { productId: new mongoose.Types.ObjectId(productId) },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          _id: 1,
          rating: 1,
          message: 1,
          createdAt: 1,
          username: "$user.fullName",
        },
      },
      { $sort: { createdAt: -1 } },
    ]);

    const stats = await Review.aggregate([
      { $match: { productId: new mongoose.Types.ObjectId(productId) } },
      {
        $group: {
          _id: null,
          totalReviews: { $sum: 1 },
          avgRating: { $avg: "$rating" },
        },
      },
    ]);

    const totalReviews = stats[0]?.totalReviews || 0;
    const avgRating = stats[0]?.avgRating || 0;
    const roundedAvgRating = Number(avgRating.toFixed(1));

    res.status(200).json({
      success: true,
      totalReviews,
      avgRating: roundedAvgRating,
      reviews: reviewData,
    });
  } catch (error) {
    console.log("error in getReview", error);
    res.status(500).json({ success: false, error: "server error" });
  }
};


export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {$limit: 10},
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "productId",
          as: "reviews",
        },
      },
      {
        $addFields: {
          averageRating: {
            $avg: "$reviews.rating",
          },
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          desc: 1,
          category: 1,
          price: 1,
          offerPrice: 1,
          badge: 1,
          active: 1,
          image: 1,
          rating: { $round: [{$ifNull: ["$averageRating", 0]},1]},
        },
      },
    ]);
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log("error in getAllHomeProduct", error);
    res.status(500).json({ success: false, error: "server error" });
  }
};