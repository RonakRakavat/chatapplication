import mongoose,{Schema} from 'mongoose'

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowerCase:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowerCase:true,
    },
    password:{
        type:String,
        required:true
    },
    isAvatarImageSet:{
        type:Boolean,
        default:false

    },
    avatarImage:{
        type:String,
        default:""
    }
})

export const User=mongoose.model("User",userSchema);