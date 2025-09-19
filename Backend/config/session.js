import session from "express-session";
import dotenv from "dotenv";
dotenv.config();


export const sessionMiddleware =  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    },
  });
