import express from "express";
import { uploadImage,addProduct, getProducts , updateProduct,getAllUser} from "../controllers/admin.controller.js";
import upload from "../config/multer.js";



 export const  router = express.Router();

 router.post('/uploadImage', upload.single('image'), uploadImage)
 router.post('/addProduct',  addProduct);
 router.get('/getProducts',  getProducts);
 router.put('/updateProduct/:id',  updateProduct);
 router.get('/getAllUser',  getAllUser);




