// src/app.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import config from "./config/index";
import errorHandler from "./middleware/errorHandler";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all origins
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//-----------------------------Router-----------------------------------
config.routes(app);
//-----------------------------Database--------------------------------
config.db();

app.get("/", (req, res) => {
  res.send("Hello, Express with CORS and TypeScript! All origins are allowed.");
});

//-----------------------------Error handler--------------------------------
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
