import express from "express";
import { getSheetData } from "../controllers/sheetController.js";

const router = express.Router();

router.post("/data", getSheetData);

export default router;
