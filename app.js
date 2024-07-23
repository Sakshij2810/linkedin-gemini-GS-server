import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import helmet from "helmet";

// Route imports
import sheetRoute from "./routes/sheetRoute.js";
import authRoute from "./routes/authRoute.js";
import geminiRoute from "./routes/geminiRoute.js";
import userRoute from "./routes/userRoute.js";

// Passport config
import "./config/passport.js";

dotenv.config({ path: "./config/config.env" });

const app = express();
const PORT = process.env.PORT || 4000;

// const corsOptions = {
//   origin: "https://linkedin-gemini-gs-client.vercel.app",
//   optionsSuccessStatus: 200,
// };

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

// Setting CSP headers to allow fonts
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      fontSrc: ["'self'", "https://linkedin-gemini-gs-server.onrender.com"],
      // Add other sources as needed
    },
  })
);

// Routes
app.use("/api/v1/sheet", sheetRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/gemini", geminiRoute);
app.use("/api/v1/user", userRoute);

app.get("/", (req, res) => {
  res.send(
    `Server is working on PORT ${PORT} and project name is Linkedin-Gemini-GoogleSheet-Integration`
  );
});

export default app;
