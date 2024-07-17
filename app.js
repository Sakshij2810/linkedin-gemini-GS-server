import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import passport from "passport";

// Route imports
import sheetRoute from "./routes/sheetRoute.js";
import authRoute from "./routes/authRoute.js";
import geminiRoute from "./routes/geminiRoute.js";

// Passport config
import "./config/passport.js";

dotenv.config({ path: "./config/config.env" });

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(
  session({
    secret: process.env.SESSION_SECRETE,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/v1", sheetRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/gemini", geminiRoute);

app.get("/", (req, res) => {
  res.send(
    `Server is working on PORT ${PORT} and project name is Linkedin-Gemini-GoogleSheet-Integration`
  );
});

export default app;
