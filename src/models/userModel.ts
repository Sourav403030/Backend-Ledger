import mongoose from "mongoose";
import bcrypt from "bcrypt"
import * as z from "zod";

interface userSchemaInterface{
    name: string
    email: string
    password: string
}

// Interface for instance methods
interface userMethods{
    comparePassword(password: string): Promise<boolean>;
}

// Create a type that combines the schema interface with methods
type UserDocument = mongoose.Document & userSchemaInterface & userMethods;

const userSchema = new mongoose.Schema<UserDocument>({
    name:{
        type: String,
        required: [true, "Name is required"],
        unique: [true, "Name must be unique"],
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email must be unique"],
        lowercase: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
    }
})


// validation for user registration.
export const userRegisterSchema: z.ZodObject = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string()
})

// validation for user login
export const userLoginSchema: z.ZodObject = z.object({
    email: z.email(),
    password: z.string()
})

// This runs before saving something into userModel.
userSchema.pre("save", async function(){
    if(!this.isModified("password")){
        return;
    }

    const hashPassword = await bcrypt.hash(this.password, 10);

    this.password = hashPassword;
    return;
})

// Method to compare user provided password and password stored in DB.
userSchema.methods.comparePassword = async function(password: string){
    return await bcrypt.compare(password, this.password);
}

export const userModel = mongoose.model("users", userSchema);