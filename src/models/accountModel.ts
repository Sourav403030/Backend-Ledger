import mongoose from "mongoose";

enum Status{
    active = "ACTIVE",
    frozen = "FROZEN",
    closed = "CLOSED"
}

interface accountSchemaInterface{
    user: mongoose.Schema.Types.ObjectId
    status: Status
    currency: string
}



const accountSchema = new mongoose.Schema<accountSchemaInterface>({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "Account must be associated with a user"],
        index: true,
    },
    status:{
        enum:{
            values: ["ACTIVE", "FROZEN", "CLOSED"],
            message: "Status can be either ACTIVE, FROZEN, CLOSED"
        }
    },
    currency:{
        type: String,
        required:[true, "Currency is required for creating an account"],
        default: "INR"
    }

}, {timestamps: true})

accountSchema.index({user: 1, status: 1});

export const accountModel = mongoose.model("account", accountSchema);