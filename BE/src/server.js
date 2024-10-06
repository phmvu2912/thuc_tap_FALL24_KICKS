import express from 'express';
import dotenv from 'dotenv';
import connectMongo from './connect.js';
import router from './routes/index.js';

const app = express();

dotenv.config();

// PORT
const port = process.env.PORT || 8000; 

// Connect MongoDB
const uri = process.env.MONGO_URI || null;
connectMongo(uri);

// Router
router(app);

// Listen
app.listen(port, () => {
    console.log(`Server đang chạy ở cổng ${port}`);
})