// import express from "express";
// import {
//   readFromGoogleSheet,
//   writeInsideGooglesheet,
// } from "../controllers/sheetController.js";

// const router = express.Router();

// router.get("/google-sheet-write", writeInsideGooglesheet);
// router.get("/google-sheet-read", readFromGoogleSheet);

// export default router;

import express from "express";
import {
  readFromGoogleSheet,
  writeInsideGooglesheet,
} from "../controllers/sheetController.js";
import { ensureAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/google-sheet-write", ensureAuthenticated, writeInsideGooglesheet);
router.get("/google-sheet-read", ensureAuthenticated, readFromGoogleSheet);

export default router;
