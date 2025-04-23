import express from "express"
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.routes.js";

dotenv.config(
    {
        path:'./env'
        
    }
)
const app = express();

app.use(express.json());

app.get("/", (req,res)=>{
    res.send("Hello guys welcome to leetlab🔥")
})

app.use("/api/v1/auth", authRoutes)

const port = 3003 || process.env.PORT

app.listen(port, ()=>{
    console.log(`server is running ${port}`);
    
})