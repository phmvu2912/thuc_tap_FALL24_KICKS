import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    description: String,
    sizes: [String],
    variants: [
        {
            color: String,
            stock: Number,
            price: Number,
            thumbnail: String,
        }
    ],
    slug: {
        type: String,
        required: true,
        unique: true,
    }
})

export default mongoose.model("Product", productSchema);