import express from "express";
import { uploadImage,addProduct, getProducts } from "../controllers/admin.controller.js";
import upload from "../config/multer.js";



 export const  router = express.Router();

 router.post('/uploadImage', upload.single('image'), uploadImage)
 router.post('/addProduct',  addProduct);
 router.get('/getProducts',  getProducts);




