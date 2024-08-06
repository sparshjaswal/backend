import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/register.js";
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

// Error handling middleware (example)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Routes
app.use("/api/v1/", routes);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${port}`);
});
