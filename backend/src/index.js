import express from "express"
import dotenv from 'dotenv';
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.routes.js";


dotenv.config(
    {
        path:'./env'
        
    }
)
const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req,res)=>{
    res.send("Hello guys welcome to leetlab🔥")
})

app.use("/api/v1/auth", authRoutes)

const port = 8080 || process.env.PORT

app.listen(port, ()=>{
    console.log(`server is running ${port}`);
    
})