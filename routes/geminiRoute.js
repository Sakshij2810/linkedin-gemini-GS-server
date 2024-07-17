// routes/geminiRoute.js
import express from "express";
import { generateGeminiContent } from "../controllers/geminiController.js";
import { ensureAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/generate-content", generateGeminiContent);

export default router;
