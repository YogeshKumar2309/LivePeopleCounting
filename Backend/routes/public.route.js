import express from "express";
import { getAllHomeProduct } from "../controllers/public.controller.js";

 export const  router = express.Router();


router.get("/getHomeProduct", getAllHomeProduct);






