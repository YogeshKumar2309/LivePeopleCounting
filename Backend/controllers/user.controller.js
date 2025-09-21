import { Favorite } from "../models/favorite.model.js";

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
    })

  } catch (error) {
    console.log("error from get all favorites products", error);
    res.status(500).json({ success: false, error: "server error" });
  }
}