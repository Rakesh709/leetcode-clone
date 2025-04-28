import express from "express"
 

import { db } from "../libs/db"

export const createProblem = async (req, res)=>{
    
}

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

export const getAllProblemById= async (req, res)=>{
    const {id} = req.params;
    try {
        const problem = await db.problem.findUniqu({
            where:{
                id
            }
        })

        if(!problem){
            return res.status(404).json({
                success:true,
                message:"Problem not found"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Problem found successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error:"Error while fetching problems"
        })
    }
}

export const updateProblem = async(req, res)=>{
    //id
    //id --> problem(condtion)
    //baki kaam same as create
}

export const deleteProblem =async (req, res)=>{}

export const getAllProblemsSolvedByUser  = async ( req, res)=>{}

