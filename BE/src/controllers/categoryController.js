import Category from "../models/Category.js";

// ! GET ALL
const getCategories = async (req, res) => {
    try {

        const categories = await Category.find().populate('category');

        // * Kiểm tra xem có sản phẩm nào không
        if (categories === 0) {
            return res.status(400).json(
                {
                    status: false,
                    data: [],
                    message: "Không có danh mục nào!"
                }
            );
        }

        return res.status(200).json(
            {
                status: true,
                data: categories,
                message: "Lấy danh sách danh mục thành công!"
            }
        )

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: 'Có lỗi xảy ra khi lấy danh sách danh mục!'
        })
    }
}

export { getCategories };