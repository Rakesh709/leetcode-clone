import express from "express";
import dotenv from "dotenv"


const app = express();
dotenv.config({})

let port = process.env.PORT

app.get("/",(req,res)=>{
    res.send("working")
    
})
//  ratan bhai = 7549522237

app.listen(port ,()=>{
    console.log(`Server is running on port ${port}`);
    
})

