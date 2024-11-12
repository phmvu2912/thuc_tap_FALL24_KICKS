import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
    },
    address: {
        type: String,
    },
    role: {
        type: String,
        enum: ["admin", "user", "staff"],
        default: "user",
    }
})

export default mongoose.model("User", userSchema);