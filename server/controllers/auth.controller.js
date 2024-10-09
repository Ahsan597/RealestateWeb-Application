import User from "../models/user.model.js"
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/errors.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    const { userName, email, password } = req.body;
    try {
        const hashedPassword = bcryptjs.hashSync(password, 10)
        const newUser = new User({ userName, email, password: hashedPassword });

        await newUser.save()
        res.status(201).json("user created succesfully")
    } catch (error) {
        next(error)
    }

}

export const Signin = async(req, res, next)=>{
    const{email, password} =req.body
    try {
        const validUser = await User.findOne({email});
        if(!validUser) return next(errorHandler(404, 'User not found'));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword) return next(errorHandler(401, "Invalid Credentials!"))
        const token =jwt.sign({id: validUser._id}, process.env.JWT_SECRET)
        const {password: pass,  ...rest} = validUser._doc
        res.cookie('access_token', token , {httpOnly: true})
        .status(200)
        .json(rest);
    } catch (error) {
        next(error)
    }
}