import express from "express";
import { login, logout, sessionCheck, signup} from "../controllers/authController.js";

 export const  router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/session", sessionCheck);


