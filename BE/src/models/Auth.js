import mongoose from "mongoose";

const { Schema } = mongoose;

const authSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

export default mongoose.model("Auth", authSchema);