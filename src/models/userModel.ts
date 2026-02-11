import mongoose from "mongoose";
import bcrypt from "bcrypt"

interface userSchemaInterface{
    name: string
    email: string
    password: string
}

const userSchema = new mongoose.Schema<userSchemaInterface>({
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

userSchema.pre("save", async function(){
    if(!this.isModified("password")){
        return;
    }

    const hashPassword = await bcrypt.hash(this.password, 10);

    this.password = hashPassword;
    return;
})

userSchema.methods.comparePassword = async function(password: string){
    return await bcrypt.compare(password, this.password);
}