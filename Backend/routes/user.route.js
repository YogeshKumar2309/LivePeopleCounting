import express from "express";
import { addToFavorite ,getAllFavorites,postReview,sendMessage} from "../controllers/user.controller.js";





 export const  router = express.Router();

router.post("/favorite", addToFavorite);
router.get("/getAllFavorites", getAllFavorites);
router.post("/review", postReview);
router.post("/contactMsg", sendMessage);







