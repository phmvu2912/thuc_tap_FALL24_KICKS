import express from 'express';
import dotenv from 'dotenv';
import connectMongo from './connect.js';
import router from './routes/index.js';
import bodyParser from 'body-parser';

const app = express();
dotenv.config();

// Config bodyParser
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

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