import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/errors.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    const { userName, email, password } = req.body; 
    if (!userName || !email || !password) {
        return res.status(400).json({ error: 'All fields (userName, email, password) are required' });
      }
      // Ensure the password is a valid string
      if (typeof password !== 'string') {
        return res.status(400).json({ error: 'Password must be a valid string' });
      }
    try {   

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
    
        const newUser = new User({ userName, email, password: hashedPassword });
        await newUser.save();
                    await data.save()
                    res.status(201).json("user created succesfully")
                } catch (error) {
                    next(error)
            //     }
            }

//    try { 
//     let user={}
//     user.userName= req.body.userName,
//     user.email= req.body.email,
//     user.password = req.body.password
//     let data = new User(user)

//     const salt = await bcrypt.genSalt(10);
//     // const hashedPassword = bcrypt.hashSync(password, 10)
//     data.password = await bcrypt.hash(data.password, salt);
//     // const newUser = new User({ userName, email, password: hashedPassword });
 
//         await data.save()
//         res.status(201).json("user created succesfully")
//     } catch (error) {
//         next(error)
//     }
}

export const Signin = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, 'User not found'));
        const validPassword = bcrypt.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, "Invalid Credentials!"))
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
        const { password: pass, ...rest } = validUser._doc
        res.cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(rest);
    } catch (error) {
        next(error)
    }
}


export const google = async(req,res,next)=>{
    try {
        const user = await  User.findOne({email: req.body.email})
        if(user){
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
            const {password: pass, ...rest } = user._doc;
            res
            .cookie('access_token', token, {httpOnly: true})
            .status(200)
            .json(rest)
        }else{
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(16).slice(-8);
            const hashedPassword =bcrypt.hash(generatedPassword, 10)
            const newUser = new User({userName: req.body.userName.split("").join("").toLowerCase() + Math.random().toString(36).slice(-4), email: req.body.email, password: hashedPassword, avatar: req.body.photo})
            await newUser.save();
            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET)
            const {password: pass, ...rest } = newUser._doc;
            res
            .cookie('access_token', token, {httpOnly: true})
            .status(200)
            .json(rest)
        }
    } catch (error) {
        next(error)
    }
}