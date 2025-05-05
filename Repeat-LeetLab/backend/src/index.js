import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser"

const app = express();
app.use(cookieParser)
dotenv.config({
  path: "./env",
});



app.use(express.json())
app.get("/",(req,res)=>{
  res.send("Hello Guys Welcome to leetlab🔥")
})

app.use("/api/v1/auth",authRoutes);


const port = process.env.PORT || 3003

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
