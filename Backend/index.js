import express from 'express'
import dotenv from "dotenv";
import  connectDB from "./config/db.js";
import {router as authRoutesrouter} from "./routes/authRoutes.js";
// const arduinoRoutes = require("./routes/arduinoRoutes"); 
// const livePeopleRoute = require("./routes/livePeopleRoute");
import  { sessionMiddleware } from "./config/session.js";
import cors from "cors";


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
app.use(sessionMiddleware);

// Routes
app.use("/api/auth", authRoutesrouter);
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


// import express from "express";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import { router as authRoutesrouter } from "./routes/authRoutes.js";
// import { sessionMiddleware } from "./config/session.js";
// import cors from "cors";

// dotenv.config();
// const app = express();
// const port = process.env.PORT || 3000;

// // DB Connect
// connectDB();

// // Middlewares
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );
// app.use(express.json());

// // ✅ yaha session middleware lagana zaruri hai
// app.use(sessionMiddleware);

// // Routes
// app.use("/api/auth", authRoutesrouter);

// // Default route
// app.get("/", (req, res) => {
//   res.send("Server is running...");
// });

// // Start server
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
