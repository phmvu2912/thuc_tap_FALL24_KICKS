import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    description: String,
    variants: [
        {
            color: String,
            sizes: [String],
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

export default mongoose.model('Product', productSchema); 