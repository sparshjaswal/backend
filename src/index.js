import express from "express";
import bodyParser from "body-parser";
import register from "./routes/register";
import basic from "./routes/basic";
import db from "./db/mongooseDB";
import dotenv from "dotenv";
import pm2 from "pm2";

dotenv.config();

const app = express();
app.locals.db = db;
app.use(bodyParser.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Routes
app.use("/", basic);
app.use("/api/v1/", register);

// PM2 configuration
const pm2Config = {
  name: "backend",
  script: "index.js",
  instances: 2,
  exec_mode: "cluster",
  env: {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
  },
};

// Start PM2 and Express server
pm2.start(pm2Config, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    app.listen(process.env.PORT, () => {
      console.log(`Server started on port ${process.env.PORT}`);
    });
  }
});
