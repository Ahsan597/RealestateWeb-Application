import User from "../models/user.model.js"
import bcrypt from "bcrypt";

export const signup = async(req, res) =>{
    const {userName, password, email}=req.body
    const hashedPassword =  bcrypt.hashSync(password, 10)
    const newUser = new User({userName, password: hashedPassword, email});
    try {
         await newUser.save()
         res.status(201).json("user created succesfully")
    } catch (error) {
        res.status(500).json(error.message)
    }
   
}