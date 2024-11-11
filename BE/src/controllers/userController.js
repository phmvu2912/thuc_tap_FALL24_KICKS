import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userValidation from "../validation/userValidation.js";
import User from '../models/User.js';

// ! LOGIN
export const login = async (req, res) => {
    try {
        const output = await userValidation.validate({
            ...req.body
        });

        // Kiểm tra xem email có tồn tại không
        const userExist = await User.findOne({ email: output.email });

        if (!userExist) return res.status(400).json({ status: false, message: 'Email không tồn tại!' });

        // So sánh mật khẩu
        const isMatch = await bcrypt.compare(output.password, userExist.password);

        if (!isMatch) return res.status(400).json({ status: false, message: 'Mật khẩu không chính xác!' });

        // Tạo token
        const token = jwt.sign(
            { email: userExist.email, _id: userExist._id, username: userExist.username },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            status: true,
            data: { user: { email: userExist.email, _id: userExist._id, username: userExist.username }, token },
            message: 'Đăng nhập thành công!',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Có lỗi xảy ra khi đăng nhập!'
        });
    }
};

export const register = async (req, res) => {
    try {
        const output = await userValidation.validate({
            ...req.body
        });

        // Kiểm tra xem email tồn tại chưa
        const userExist = await User.findOne({ email: output.email });

        if (userExist) return res.status(400).json({ status: false, message: 'Email đã tồn tại!' });

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(output.password, 10);

        const user = await User.create({
            ...output,
            password: hashedPassword
        });

        if (!req.body) return res.status(400).json({
            status: false,
            error: 'Đã xảy ra sự cố khi gửi dữ liệu lên!',
            message: 'Đăng ký thành công!'
        })

        return res.status(200).json({
            status: true,
            data: user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Có lỗi xảy ra khi đăng ký!'
        });
    }
}

export const getUsers = async (req, res) => {
    try {
        
        const users = await User.find();

        res.status(200).json({
            status: true,
            data: users
        })

    } catch (error) {
        
    }
}   