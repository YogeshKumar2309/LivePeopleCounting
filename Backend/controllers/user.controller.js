import mongoose from "mongoose";
import { Cart } from "../models/cart.modle.js";
import { Favorite } from "../models/favorite.model.js";
import { Message } from "../models/message.model.js";
import { Product } from "../models/product.model.js";
import Review from "../models/review.model.js";
import { Order } from "../models/order.model.js";

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

//postUpdateCartQuantity
export const postUpdateCartQuantity = async (req, res) => {
  const userId = req.session.user.id;
  const { productId, quantity } = req.body;
  if (!userId || !productId || quantity === undefined)
    throw new Error("userId, productId, and quantity is required!");
  try {
    let cartItem = await Cart.findOne({ userId, productId });
    if (cartItem) {
      cartItem.quantity = quantity;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({ userId, productId, quantity });
      await cartItem.save();
    }
    res.status(200).json({
      success: true,
      message: "cart item saved!",
    });
  } catch (error) {
    console.log("Error comes to postUpdateCart", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};

//getCart
export const getCart = async (req, res) => {
  try {
    const userId = req.session.user.id;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const cartItems = await Cart.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $unwind: "$productDetails",
      },
      {
        $project: {
          _id: 1,
          userId: 1,
          productId: 1,
          quantity: 1,
          isActive: 1,
          "productDetails._id": 1,
          "productDetails.title": 1,
          "productDetails.price": 1,
          "productDetails.offerPrice": 1,
          "productDetails.image": 1,
          "productDetails.category": 1,
          "productDetails.badge": 1,
        },
      },
    ]);

    res.json({
      success: true,
      cartItems,
    });
  } catch (error) {
    console.log("Error comes to getCart", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const userId = req.session.user?.id;
    const { productId } = req.body;
    if (!userId || !productId) {
      return res
        .status(400)
        .json({ message: "userId and productID are required!" });
    }

    const deletedItem = await Cart.findOneAndDelete({ userId, productId });

    if (!deleteCart) {
      return res.status(404).json({
        success: true,
        message: "Item not found in cart!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Item is deleted successfully in cart!",
      deletedItem,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error:" + error.messsage });
  }
};

//UpdateCartActive
export const postUpdateCartActive = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { productId, isActive } = req.body;

    if (!userId || !productId || isActive === undefined) {
      return res.status(400).json({
        success: false,
        message: "Missing fields!",
      });
    }

    const cartItem = await Cart.findOne({ userId, productId });
    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found!",
      });
    }

    cartItem.isActive = isActive;
    await cartItem.save();

    res.status(200).json({
      success: true,
      message: "Cart item active status updated!",
    });
  } catch (error) {
    console.log("Error in postUpdateCartActive", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server Error!",
    });
  }
};


//confirm order
export const confirmOrder = async (req, res) => {
 try {
  const userId = req.session.user.id;

  //fetch active cart items
  const cartItems = await Cart.find({
    userId, 
    isActive: true
  }).populate("productId");

  if(cartItems.length === 0) {
    return res.status(400).json({
      success: false,
      message: "No active items in cart!",
    });
  }

  //calculate total amount
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.productId.price * item.quantity, 0
  );

  //create new order
  const newOrder = await Order.create({
    userId, 
    items: cartItems.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
      price: item.productId.price,
    })),
    totalAmount,
    paymentMethod: 'cod',
    status: "confirmed",
  });

  //mark cart items as inactive
  await Cart.updateMany({userId, isActive: true}, {isActive: false});

  res.status(200).json({
    success: true,
    message: "Order confirmed successfully!",
    orderId: newOrder._id,
  })
  
 } catch (error) {
  console.error("Error in confirmOrder:", error.message);
  res.status(500).json({
    success: false,
    message: "Internal server error!"
  })
 }
}