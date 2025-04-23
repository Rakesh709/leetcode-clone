import bcrypt from "bcryptjs"
import {db} from "../libs/db.js"
import { json } from "express";

export const register = async ( req, res) =>{
    const {name, email, password} = req.body;

    try {
        const existingUser = await db.user.findUnique({
            where:{
                email
            }
        })
        if(!existingUser){
            return res.status(400, json({
               error: "User alredy exists" 
            }))
        }

        const hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
        
    }

}

export const login = async (req, res) =>{}

export const logout =async (req, res) =>{}

export const check = async ( req, res)=>{}