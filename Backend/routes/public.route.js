import express from "express";
import { getAllHomeProduct ,getProductDetails,getReview,getAllProduct} from "../controllers/public.controller.js";

 export const  router = express.Router();


router.get("/getHomeProduct", getAllHomeProduct);
router.get("/getProductDetails", getProductDetails);
router.get("/getReviews", getReview);
router.get("/getAllProduct", getAllProduct);





