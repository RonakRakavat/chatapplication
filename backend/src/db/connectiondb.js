import mongoose from "mongoose";


const connectiondb = async() => {
    try {
       var connectionstring= await mongoose.connect(`${process.env.MONGO_URL}`);
       console.log('connection successfull')
    } catch (error) {
        console.log("connection error",error)
    }
}

export {connectiondb}