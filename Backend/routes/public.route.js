import express from "express";
import { getAllHomeProduct ,getProductDetails,getReview} from "../controllers/public.controller.js";

 export const  router = express.Router();


router.get("/getHomeProduct", getAllHomeProduct);
router.get("/getProductDetails", getProductDetails);
router.get("/getReviews", getReview);





