import express from "express";
import { getSheetData, getSheetId } from "../controllers/sheetController.js";

const router = express.Router();

router.post("/data", getSheetData);
router.post("/sheet_id", getSheetId);

export default router;
