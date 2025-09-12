require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const arduinoRoutes = require("./routes/arduinoRoutes"); 
const livePeopleRoute = require("./routes/livePeopleRoute");

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

app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/arduino", arduinoRoutes); // ✅ ADD THIS
app.use("/api", livePeopleRoute);


// Default route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
