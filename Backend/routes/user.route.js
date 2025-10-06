import express from "express";
import { addToFavorite ,getAllFavorites,postReview,sendMessage, getCart, postUpdateCartQuantity} from "../controllers/user.controller.js";

export const  router = express.Router();

router.post("/favorite", addToFavorite);
router.get("/getAllFavorites", getAllFavorites);
router.post("/review", postReview);
router.post("/contactMsg", sendMessage);
router.post("/updateCartQuantity", postUpdateCartQuantity);
router.get("/getCart", getCart);







