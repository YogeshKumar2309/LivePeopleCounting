import { Favorite } from "../models/favorite.model.js";
import { Message } from "../models/message.model.js";
import Review from "../models/review.model.js";

export const addToFavorite = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.session.user.id;

    const existingFavorite = await Favorite.findOne({ productId, userId });
    if (existingFavorite) {
      //unfavorite
      await Favorite.findByIdAndDelete(existingFavorite._id);
      return res.json({
        success: true,
        message: "Remove from favorite",
      });
    }

    //add to favorites
    const newFavorite = new Favorite({ productId, userId });
    await newFavorite.save();
    return res.json({
      success: true,
      message: "Add to favorite",
      newFavorite,
    });
  } catch (error) {
    console.log("error in addToFavorite", error);
    res.status(500).json({ success: false, error: "server error" });
  }
};

//get all favorites
export const getAllFavorites = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const favorites = await Favorite.find({ userId });

    res.status(200).json({
      success: true,
      favorites,
    });
  } catch (error) {
    console.log("error from get all favorites products", error);
    res.status(500).json({ success: false, error: "server error" });
  }
};

//post review
export const postReview = async (req, res) => {
  const userId = req.session.user.id;
  const { productId, rating, message } = req.body;
  let ratingValid = rating;

  if (!productId || rating === "" || !message) {
    console.log("inside validation", rating, productId, message);
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  try {
    if (!ratingValid || ratingValid <= 0) {
      ratingValid = 5; // default rating
    } else if (ratingValid > 5) {
      ratingValid = 5;
    }
    const review = new Review({
      productId,
      userId,
      rating: ratingValid,
      message,
    });
    await review.save();
    res.status(201).json({ success: true, review });
  } catch (error) {
    console.log("error in postReview", error);
    res.status(500).json({ success: false, error: "server error" });
  }
};

//send Message
export const sendMessage = async (req, res) => {
  const userId = req.session.user.id;
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({
      success: false,
      message: "Message is required",
    });
  }
  try {
    await Message.create({
      userId,
      message,
    });
    res.status(201).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.log("error in sendMessage", error);
    res.status(500).json({ success: false, error: "server error" });
  }
};
