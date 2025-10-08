import express from "express";
import { addToFavorite ,getAllFavorites,postReview,sendMessage, getCart, postUpdateCartQuantity,deleteCart,postUpdateCartActive,confirmOrder,getOrder,cancelOrder,deleteOrder} from "../controllers/user.controller.js";

export const  router = express.Router();

router.post("/favorite", addToFavorite);
router.get("/getAllFavorites", getAllFavorites);
router.post("/review", postReview);
router.post("/contactMsg", sendMessage);
router.post("/updateCartQuantity", postUpdateCartQuantity);
router.get("/getCart", getCart);
router.delete("/deleteCart", deleteCart);
router.post("/updateCartActive", postUpdateCartActive);
router.post("/confirmOrder", confirmOrder);
router.get("/getOrder", getOrder);
router.put("/cancelOrder/:orderId", cancelOrder);
router.delete("/deleteOrder/:orderId", deleteOrder);







