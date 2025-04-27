import express from "express"
import { db } from "../libs/db"


export const getAllProblems = async (req,res)=>{
    try {
        const problem = await db.problem.findMany();

        if(!problem){
            return res.status(404).json()
            error:"No Problem Found"
        }

        res.status(200).json({
            success:true,
            message:"Message Fetched Successfully",
            problem
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error:"Error while fetching problems"
        })
        
    }
}