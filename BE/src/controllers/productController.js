import Product from "../models/Product.js";

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

export { getProducts, getProductById };
