import Product from "../models/Product.js";
import productValidation from "../validation/productValidation.js";

// ! GET ALL
const getProducts = async (req, res) => {
    try {

        const products = await Product.find().populate('category').exec();

        // * Kiểm tra xem có sản phẩm nào không
        if (products === 0) {
            return res.status(400).json(
                {
                    status: false,
                    data: [],
                    message: "Không có sản phẩm nào!"
                }
            );
        }

        return res.status(200).json(
            {
                status: true,
                data: products,
                message: "Lấy danh sách sản phẩm thành công!"
            }
        )

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: 'Có lỗi xảy ra khi lấy danh sách sản phẩm!'
        })
    }
}

// ! GET ONE
const getProductById = async (req, res) => {
    const { id } = req.params;  // Lấy ID từ params

    try {
        const product = await Product.findById(id).populate('category').exec();

        // Kiểm tra xem sản phẩm có tồn tại không
        if (!product) {
            return res.status(404).json({
                status: false,
                message: "Sản phẩm không tồn tại!"
            });
        }

        return res.status(200).json({
            status: true,
            data: product,
            message: "Lấy sản phẩm thành công!"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Có lỗi xảy ra khi lấy sản phẩm!'
        });
    }
};

// ! CREATE ONE
export const createProduct = async (req, res) => {
    try {

        const output = await productValidation.validate(req.body);

        const product = await Product.create(output);

        if (!req.body) return res.status(400).json({
            status: false,
            error: 'Đã xảy ra sự cố khi gửi dữ liệu lên!',
            message: 'Tạo mới sản phẩm thành công!'
        })

        return res.status(201).json({
            status: true,
            data: product
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Có lỗi xảy ra khi lấy sản phẩm!'
        });
    }
}

// ! DELETE ONE
export const removeProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: 'Không tìm thấy sản phẩm!'
            });
        }

        return res.status(200).json({
            status: true,
            message: 'Xóa sản phẩm thành công!'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Có lỗi xảy ra khi xóa bản ghi!'
        });
    }
}

export { getProducts, getProductById };
