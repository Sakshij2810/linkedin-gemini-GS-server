// routes/geminiRoute.js
import express from "express";
import { generateGeminiContent } from "../controllers/geminiController.js";

const router = express.Router();

router.post("/generate_content", generateGeminiContent);

export default router;
