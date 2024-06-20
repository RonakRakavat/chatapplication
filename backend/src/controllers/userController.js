import { User } from "../models/user.model.js"
import bcrypt from 'bcrypt'
import mongoose from "mongoose"

const register = async(req,res) => {
    try {
        const {username,email,password}=req.body
        const usernameCheck=await User.findOne({username})
    
        if(usernameCheck){
            return res.json({msg:"username already exists",status:false})
        }
        const emailCheck=await User.findOne({email})
        if(emailCheck){
            return res.json({msg:"email already exists",status:false})
        }
        const hashpassword=await bcrypt.hash(password,10)
        const user=await User.create({
            username:username,
            email:email,
            password:hashpassword})
        // delete user.password
        console.log("success")
        return res.json({status:true,user})
    } catch (error) {
        console.log("user not create")
        return res.json({status:false,msg:"user not create"})
    }
}

export {register}
const login = async(req,res) => {
    try {
        console.log("ok")
        const {username,password}=req.body
        const user=await User.findOne({username})
    
        if(!user){
            return res.json({msg:"No User found",status:false})
        }
        const isPassword=await bcrypt.compare(password,user.password)
        if(!isPassword){
            return res.json({msg:"Incorrect username or password",status:false})
        }
        
        // delete user.password
        console.log("success")
        return res.json({status:true,user})
    } catch (error) {
        console.log("user not create")
        return res.json({status:false,msg:"user not create"})
    }
}

export {login}

const setavatar=async(req,res,next)=>{
    try {
        const Userid=req.params.id;
        const avatarImage=req.body.image
        const userData=await User.findByIdAndUpdate(Userid,{
            isAvatarImageSet:true,
            avatarImage
            })
        return res.json({isset:userData.isAvatarImageSet,image:userData.avatarImage})
    } catch (error) {
        next(error)
    }

}

export {setavatar}


const getAllUser = async(req,res) => {
    try {
        const users=await User.find({_id:{$ne: req.params.id}}).select([
            "email",
            "username",
            "avatarImage",
            "_id"
        ])
        return res.json(users)
    } catch (error) {
        console.log(error)
    }
}

export {getAllUser}

