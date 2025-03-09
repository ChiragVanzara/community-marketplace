import mongoose from "mongoose";
import { DB_NAME } from '../constant.js';

export const connectDB = async() => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`MongoDB connection established!!`);
    } catch (error) {
        console.error("MongoDB connection failed: ", error)
    }
}