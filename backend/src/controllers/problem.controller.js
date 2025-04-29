import express from "express"
 

import { db } from "../libs/db"

export const createProblem = async (req, res)=>{
    // going to get all the data from the request
    const {title, description, difficulty,tags, example, constraints, testCases, codeSnippets, referenceSolutions} = req.body;

    // going to check the user role once again admin or user
    if(req.user.role !== "ADMIN"){
        return res.status(403).json({
            error:"You are not allowed to create a problem"
        })
    }
    // loop through each refrence solution for diffrent lanaguage
    try {
      for(const [language,solutionCode] of Object.entries(referenceSolutions)){
        const languageId = getJudge0LanguageId(language)

        if(!languageId){
            return res.status(400).json({
                error:`Language ${language} is not supported`
            })
        }
      }  
    } catch (error) {
        
    }
    
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

