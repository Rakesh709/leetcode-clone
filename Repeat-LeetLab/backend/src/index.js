import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config({
  path: "./env",
});

const port = process.env.PORT || 3003

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
