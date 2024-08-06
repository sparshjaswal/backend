// app.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes/appRoutes.js";

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Routes will go here
app.use("/api/v1/", routes);

const port = 3001;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  
});
