import bcrypt from "bcryptjs";
import { db } from "../libs/db.js";
import { UserRole } from "../generated/prisma/index.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({
        error: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: UserRole.USER,
      },
    });

    const token = jwt.sign({id: newUser.id},process.env.JWT_SECRETE,{
        expiresIn: "7d",
      }
    );

    res.cookie("jwt",token,{
        httpOnly:true,
        sameSite:"strict",
        secure:process.env.NODE_ENV !=="development",
        maxAge: 1000*60*60*24*7
    })

    res.status(201).json({
        message:"User Created Successfully",
        user:{
            id:newUser.id,
            email:newUser.email,
            name:newUser.name,
            role: newUser.role,
            image:newUser.image
        }
    })
  } catch (error) {
    console.log("Error creating user");
    res.status(500).json({
        error:"Error Creating user"
    })
    
  }
};

export const login = async (req, res) => {};

export const logout = async (req, res) => {};

export const check = async (req, res) => {};
