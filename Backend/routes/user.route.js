import express from "express";
import { addToFavorite ,getAllFavorites,postReview} from "../controllers/user.controller.js";





 export const  router = express.Router();

router.post("/favorite", addToFavorite);
router.get("/getAllFavorites", getAllFavorites);
router.post("/review", postReview);







