import express from 'express'
import dotenv from "dotenv";
import  connectDB from "./config/db.js";
import {router as authRoutes} from "./routes/authRoutes.js";
import {router as adminRoutes} from "./routes/admin.route.js";
import {router as publicRoutes} from "./routes/public.route.js";
import {router as userRoutes} from "./routes/user.route.js";
// const arduinoRoutes = require("./routes/arduinoRoutes"); 
// const livePeopleRoute = require("./routes/livePeopleRoute");
import  { sessionMiddleware } from "./config/session.js";
import cors from "cors";
import { adminAuthMiddleware } from './middleware/adminAuthMiddleware.js';
import { userAuthMiddleware } from './middleware/userAuthMiddleware.js';


dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// DB Connect
connectDB();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionMiddleware);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin",adminAuthMiddleware, adminRoutes);
app.use("/api/user",publicRoutes);
app.use("/api/user/private",userAuthMiddleware, userRoutes);
// app.use("/api/arduino", arduinoRoutes); 
// app.use("/api", livePeopleRoute);


// Default route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

