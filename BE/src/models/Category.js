import mongoose from "mongoose";

const { Schema } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
});

export default mongoose.model('Category', categorySchema);
