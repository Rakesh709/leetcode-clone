import express from "express"
import dotenv from 'dotenv';

dotenv.config(
    {
        path:'./env'
        
    }
)
const app = express();

const port = 3003 || process.env.PORT

app.listen(port, ()=>{
    console.log(`server is running ${port}`);
    
})