import mongoose from "mongoose";

export default async function connectToDb(){
    try {

        const MONGODB_URI: string | undefined = process.env.MONGODB_URI

        if(!MONGODB_URI){
            console.log("MongoDB credentials required");
            process.exit(1);
        }

        await mongoose.connect(MONGODB_URI);

        console.log("Connected to DB");

    } catch (error: any) {
        throw new Error(error);
    }
}
