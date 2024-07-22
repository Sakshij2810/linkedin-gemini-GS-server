import passport from "passport";

export const googleAuth = passport.authenticate("google", {
  scope: [
    "profile",
    "email",
    "https://www.googleapis.com/auth/spreadsheets.readonly",
  ],
});

// export const googleAuthCallback = (req, res) => {
//   passport.authenticate("google", { failureRedirect: "/" }, (err, user) => {
//     if (err || !user) {
//       return res.redirect("/");
//     }

//     req.logIn(user, (err) => {
//       if (err) {
//         return res.redirect("/");
//       }
//       // Instead of sending a JSON response, redirect to the frontend with a query string containing user data
//       const userData = encodeURIComponent(JSON.stringify(user));
//       res.redirect(
//         `https://linkedin-gemini-gs-client.vercel.app/auth/google/callback?user=${userData}`
//       );
//     });
//   })(req, res);
// };

export const googleAuthCallback = (req, res) => {
  passport.authenticate("google", { failureRedirect: "/" }, (err, user) => {
    if (err || !user) {
      console.error("Authentication error:", err);
      return res.redirect("/");
    }

    req.logIn(user, (err) => {
      if (err) {
        console.error("Login error:", err);
        return res.redirect("/");
      }
      const userData = encodeURIComponent(JSON.stringify(user));
      res.redirect(
        `http://localhost:5173/auth/google/callback?user=${userData}`
      );
    });
  })(req, res);
};

export const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
