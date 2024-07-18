// routes/authRoute.js

import express from "express";
import {
  googleAuth,
  googleAuthCallback,
  logout,
  getCurrentUser,
} from "../controllers/authController.js";

const router = express.Router();

router.get("/google", googleAuth);

router.get("/google/callback", googleAuthCallback);

router.get("/logout", logout);

router.get("/current_user", getCurrentUser);

export default router;
