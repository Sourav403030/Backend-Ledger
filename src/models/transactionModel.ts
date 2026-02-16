import mongoose from "mongoose";

enum Status{
    pending = "PENDING",
    completed = "COMPLETED",
    failed = "FAILED",
    reversed = "REVERSED"
}

interface accountSchemaInterface{
    fromAccount : mongoose.Schema.Types.ObjectId
    toAccount: mongoose.Schema.Types.ObjectId
    status: Status
    amount: number
    idempotencyKey: string
}

const transactionSchema = new mongoose.Schema<accountSchemaInterface>({
    fromAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
        required: true,
        index: true,
    },
    toAccount:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
        required: true,
        index: true,
    },
    status:{
        enum:{
            values: ["PENDING", "COMPLETED", "FAILED", "REVERSED"],
            message: "Status can be either PENDING, COMPLETED, FAILED, REVERSED",
        },
        default: Status.pending
    },
    amount:{
        type: Number,
        required: [true, "Amount is required for creating a transaction"],
        min: [0, "Amount must be a positive number"],
    },
    idempotencyKey:{
        type: String,
        required: [true, "Idempotency key is required for creating a transaction"],
        unique: true,
        index: true,
    }
}, {timestamps: true})


transactionSchema.index({fromAccount: 1, toAccount: 1, idempotencyKey: 1})

export const transactionModel = mongoose.model("transaction", transactionSchema);
