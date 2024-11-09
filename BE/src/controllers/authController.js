import Auth from "../models/Auth.js";
import authValidation from "../validation/authValidation.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// ! LOGIN
export const login = async (req, res) => {
    try {
        const output = await authValidation.validate({
            ...req.body
        });

        // Kiểm tra xem email có tồn tại không
        const userExist = await Auth.findOne({ email: output.email });

        if (!userExist) return res.status(400).json({ status: false, message: 'Email không tồn tại!' });

        // so sánh mật khẩu
        const isMatch = await bcrypt.compare(output.password, userExist.password);

        if (!isMatch) return res.status(400).json({ status: false, message: 'Mật khẩu không chính xác!' });


        const user = await Auth.create(output);

        if (!req.body) return res.status(400).json({
            status: false,
            error: 'Đã xảy ra sự cố khi gửi dữ liệu lên!',
            message: 'Đăng nhập thất bại!'
        })

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
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Có lỗi xảy ra khi đăng nhập!'
        });
    }
}

export const register = async (req, res) => {
    try {
        const output = await authValidation.validate({
            ...req.body
        });

        // Kiểm tra xem email tồn tại chưa
        const userExist = await Auth.findOne({ email: output.email });

        if (userExist) return res.status(400).json({ status: false, message: 'Email đã tồn tại!' });

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(output.password, 10);

        const user = await Auth.create({
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