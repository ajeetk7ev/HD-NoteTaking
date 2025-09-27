import mongoose from "mongoose";


export const dbConnect = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log("DB Connected Successfully!!");
    } catch (error) {
        console.log("Failed to connect to database", error);
        process.exit(1);
    }
}