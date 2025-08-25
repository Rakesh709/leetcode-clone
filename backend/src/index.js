import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const port = 8000 || process.env.PORT

app.listen(port,()=>{
    console.log("Server is running",port

    );
    
})