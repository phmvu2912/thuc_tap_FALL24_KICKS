import mongoose from "mongoose";

const connectMongo = async (uri) => {
    try {
        
        await mongoose.connect(uri);

        console.log("Kết nối tới MongoDB thành công!");

    } catch (error) {
        console.log('Có lỗi xảy ra khi kết nối với MongoDB!')
    }
}

export default connectMongo