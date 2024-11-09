import Category from "../models/Category.js";
import categoryValidation from "../validation/categoryValidation.js";
import slugify from "slugify";

// ! GET ALL
export const getCategories = async (req, res) => {
    try {

        const categories = await Category.find().exec();

        // * Kiểm tra xem có danh mục nào không
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

// ! GET ONE
export const getCategoryById = async (req, res) => {
    const { id } = req.params;  // Lấy ID từ params

    try {
        const category = await Category.findById(id).exec();

        // Kiểm tra xem sản phẩm có tồn tại không
        if (!category) {
            return res.status(404).json({
                status: false,
                message: "Danh mục không tồn tại!"
            });
        }

        return res.status(200).json({
            status: true,
            data: category,
            message: "Lấy danh mục thành công!"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Có lỗi xảy ra khi lấy danh mục!'
        });
    }
};

// ! CREATE ONE
export const createCategory = async (req, res) => {
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
            slug: slugify(req.body.name, {
                replacement: '-',
                lower: true,
                strict: true,
                locale: 'vi',
                trim: true
            })
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

// ! UPDATE ONE
export const updateCategory = async (req, res) => {
    try {
        const output = await categoryValidation.validate({
            ...req.body,
            slug: slugify(req.body.name, {
                replacement: '-',
                lower: true,
                strict: true,
                locale: 'vi',
                trim: true
            })
        });

        const category = await Category.findByIdAndUpdate(req.params.id, output);

        if (!category) {
            return res.status(404).json({ message: "Danh mục không tìm thấy" });
        }

        if (!req.body) return res.status(400).json({
            status: false,
            error: 'Đã xảy ra sự cố khi gửi dữ liệu lên!',
            message: 'Cập nhật danh mục thành công!'
        })

        return res.status(200).json({
            status: true,
            data: category,
            message: 'Cập nhật danh mục thành công!'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Có lỗi xảy ra khi lấy danh mục!'
        });
    }
}

// ! DELETE ONE
export const removeCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);

        if (!category) {
            return res.status(404).json({
                message: 'Không tìm thấy danh mục!'
            });
        }

        return res.status(200).json({
            status: true,
            message: 'Xóa danh mục thành công!'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Có lỗi xảy ra khi xóa bản ghi!'
        });
    }
}