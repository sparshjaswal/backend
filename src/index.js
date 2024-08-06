import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import routes from "./routes/appRoutes.js";

const app = express();
app.use(bodyParser.json());

// Connect to the specific database and collection
const mongoUrl =
  "mongodb+srv://jaswalsparsh:sparshjaswal123@cluster0.iiyph.mongodb.net/backend?retryWrites=true&w=majority";
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB - backend database");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });

// Access to the database through app.locals
const db = mongoose.connection;
app.locals.db = db;

// Error handling middleware (example)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Routes
app.use("/api/v1/", routes);

const port = 3001;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
