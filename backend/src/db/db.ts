import mongoose from "mongoose";
import { ENV } from "../config/ENV";

const dbURL:string = ENV.DB_URL || ""

const connectDB = async() =>{
    try{

        await mongoose.connect(dbURL).then((data:any)=> console.log(`database connected with ${data.connection.host}`))

    }catch(err:any){
        console.log(err.message)
        setTimeout(connectDB,5000)
    }
}

export default connectDB