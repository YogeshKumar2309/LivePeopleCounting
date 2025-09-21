import express from "express";
import { addToFavorite ,getAllFavorites} from "../controllers/user.controller.js";





 export const  router = express.Router();

router.post("/favorite", addToFavorite);
router.get("/getAllFavorites", getAllFavorites);






