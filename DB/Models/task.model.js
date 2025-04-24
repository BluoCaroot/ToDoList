
import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
{
    title:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        tirm: true,
        lowercase: true
    },
    description:{
        type: String,
        required: true,
        unique: true,
        tirm: true,
        lowercase: true
    },
    status:{
        type: String,
        enum: ["pending", "in progress", "completed"],
        default: "pending",
        required: true,
        minlength: 8,
    },
    priority:{
        type: String,
        enum: ["low", "medium", "high"],
        default: "low",
        required: true
    },
    assignedTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dueDate:{
        type: Date,
        required: false
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isDeleted: { type: Boolean, default: false },

}, { timestamps: true })



export default mongoose.models.User || model('User', userSchema)