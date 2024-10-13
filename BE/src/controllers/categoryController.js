import Category from "../models/Category.js";

// ! GET ALL
const getCategories = async (req, res) => {
    try {

        const categories = await Category.find().populate('products').exec();

        // * Kiểm tra xem có sản phẩm nào không
        if (!categories) {
            return res.status(404).json(
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

// ! CREATE ONE
const createCategory = async (req, res) => {
    try {
        // Kiểm tra xem req.body có tồn tại và có thuộc tính name không
        if (!req.body) {
            return res.status(400).json({
                status: false,
                message: "Không có dữ liệu gửi lên!"
            });
        }

        const data = {
            ...req.body,
            slug: req.body.name.toLowerCase().replace(/ /g, '-')
        };

        const category = await Category.create(data);

        // Kiểm tra nếu category được tạo thành công
        if (!category) {
            return res.status(400).json({
                status: false,
                data: [],
                message: "Tạo danh mục thất bại!"
            });
        }

        return res.status(201).json({
            status: true,
            data: category,
            message: "Tạo danh mục thành công!"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: 'Có lỗi xảy ra khi tạo danh mục!'
        });
    }
}


export { getCategories, createCategory };