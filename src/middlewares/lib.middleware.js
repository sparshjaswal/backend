import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import xss from "xss-clean";
import compression from "compression";
import responseTime from "response-time";
import express from "express";

const middlewares = [
  express.json({ limit: "16kb" }),
  express.urlencoded({ extended: true, limit: "16kb" }),
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
  cookieParser(),
  express.static("public"),
  helmet(),
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  }),
  xss(),
  compression(),
  responseTime(),
  (req, res, next) => {
    // custom middleware to log requests
    console.log(`Request: ${req.method} ${req.url}`);
    next();
  },
];

export { middlewares };
