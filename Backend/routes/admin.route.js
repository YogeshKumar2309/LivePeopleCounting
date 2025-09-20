import express from "express";
import { uploadImage,addProduct } from "../controllers/admin.controller.js";
import upload from "../config/multer.js";




 export const  router = express.Router();

 router.post('/uploadImage', upload.single('image'), uploadImage)
 router.post('/addProduct',  addProduct)




