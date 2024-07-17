import dotenv from "dotenv";
import connectDatabase from "./config/database.js";
import app from "./app.js";

dotenv.config({ path: "./config/config.env" });

connectDatabase();

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server is working on PORT ${PORT}`);
});
