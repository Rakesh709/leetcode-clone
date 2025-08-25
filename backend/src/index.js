import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";



const app = express();
dotenv.config();
app.use(express.json());

app.use(cookieParser());
const port = 8000 || process.env.PORT





app.get("/",(req,res)=>{
    res.send("Hello guys welcome to leetProblem");
    
})

app.use("/api/v1/auth",authRoutes)


app.listen(port,()=>{
    console.log("Server is running",port

    );
    
})