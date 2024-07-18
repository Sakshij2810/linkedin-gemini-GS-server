// controllers/authController.js

import passport from "passport";

//Output: Redirects the user to Google's OAuth page.
// Purpose: Initiates the Google OAuth authentication process.
// Behavior: When a user attempts to log in with Google, this function redirects them to Google's authentication page. It requests access to the user's Google profile, email, and Google Sheets.
export const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email", "https://www.googleapis.com/auth/spreadsheets"],
});

// Purpose: Handles the callback from Google after the user has authenticated.
// Behavior:
// 1. Tries to authenticate the user using Passport's Google strategy.
// 2. If authentication fails or there is an error, it redirects the user to the home page ("/").
// 3. If successful, it logs the user in and redirects them to the dashboard ("/dashboard").
// Output: Redirects the user to the home page on failure or the dashboard on success.
export const googleAuthCallback = (req, res) => {
  try {
    passport.authenticate("google", { failureRedirect: "/" }, (err, user) => {
      if (err || !user) {
        return res.redirect("/");
      }
      req.logIn(user, (err) => {
        if (err) {
          return res.redirect("/");
        }
        res.redirect("http://localhost:5173/dashboard");
      });
    })(req, res);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const logout = (req, res, next) => {
  try {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  } catch (error) {
    res.status(404).json(error);
  }
};

export const getCurrentUser = (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    res.status(404).json(error);
  }
};
