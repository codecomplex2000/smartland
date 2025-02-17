import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

if(!DB_URI){
    throw new Error("DB_URI env variable is not defined");
}

const connectToDb = async()=>{
    try {
        await mongoose.connect(DB_URI)
        console.log('database connected successully');
    } catch (error) {
        console.error('Error connecting to the database: ', error);
        process.exit(1);
    }
}

export default connectToDb