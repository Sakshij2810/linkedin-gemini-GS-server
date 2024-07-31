// // routes/authRoute.js

// import express from "express";
// import {
//   googleAuth,
//   googleAuthCallback,
//   logout,
// } from "../controllers/authController.js";

// const router = express.Router();

// router.get("/google", googleAuth);

// router.get("/google/callback", googleAuthCallback);

// router.get("/logout", logout);

// export default router;

import express from "express";
import passport from "passport";
import {
  googleAuth,
  googleAuthCallback,
  logout,
} from "../controllers/authController.js";

const router = express.Router();

router.get("/linkedin", passport.authenticate("linkedin", { state: true }));

router.get(
  "/linkedin/callback",
  passport.authenticate("linkedin", { failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication
    const userData = encodeURIComponent(JSON.stringify(req.user));
    res.redirect(
      `http://localhost:5173/auth/linkedin/callback?user=${userData}`
    );
  }
);

router.get("/google", googleAuth);
router.get("/google/callback", googleAuthCallback);
router.get("/logout", logout);

export default router;
