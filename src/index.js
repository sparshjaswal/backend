import express from "express";
import user from "./routes/user.route.js";
import db from "./db/mongooseDB.js";
import dotenv from "dotenv";
import { middlewares } from "./middlewares/lib.middleware.js";
dotenv.config();

const app = express();
app.locals.db = db;

// middleware
app.use(middlewares);

// Routes
app.use("/api/v1/user", user);

// Start Express server
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
