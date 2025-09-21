import express from "express";
import { getAllHomeProduct } from "../controllers/public.controller.js";
// import upload from "../config/multer.js";



 export const  router = express.Router();

//  router.post('/uploadImage', upload.single('image'), uploadImage)
router.get("/getHomeProduct", getAllHomeProduct);






