import Product from "../models/Product.js";
import productValidation from "../validation/productValidation.js";
import slugify from "slugify";

// ! GET ALL
const getProducts = async (req, res) => {
    try {
        const { query, minPrice, maxPrice, sort } = req.query;

        // Tạo bộ lọc tìm kiếm
        const filter = {};

        // Thêm điều kiện tìm kiếm theo tiêu đề nếu có query
        if (query) {
            filter.title = { $regex: query, $options: 'i' }; // Tìm kiếm gần giống (case-insensitive)
        }

        // Thêm điều kiện lọc theo giá nếu có
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = parseFloat(minPrice);
            if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
        }

        // Tạo điều kiện sắp xếp nếu có
        let sortOptions = {};
        if (sort) {
            // Giả sử sort là kiểu 'price' hoặc 'name'
            if (sort === 'price') {
                sortOptions.price = 1; // 1 cho sắp xếp tăng dần, -1 cho sắp xếp giảm dần
            } else if (sort === 'name') {
                sortOptions.title = 1; // Sắp xếp theo tên (title)
            }
        }

        console.log("Filter applied:", filter);

        // Thực hiện truy vấn sản phẩm dựa trên bộ lọc và sắp xếp
        const products = await Product.find(filter).sort(sortOptions)
            .sort(sortOptions)
            .populate('category')
            .exec();

        // Kiểm tra nếu không có sản phẩm nào được tìm thấy
        if (products.length === 0) {
            return res.status(400).json({
                status: false,
                data: [],
                message: "Không có sản phẩm nào!"
            });
        }

        // Trả về danh sách sản phẩm nếu tìm thấy
        return res.status(200).json({
            status: true,
            data: products,
            message: "Lấy danh sách sản phẩm thành công!"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Có lỗi xảy ra khi lấy danh sách sản phẩm!'
        });
    }
};


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
        const output = await productValidation.validate({
            ...req.body,
            slug: slugify(req.body.title, {
                replacement: '-',
                lower: true,
                strict: true,
                locale: 'vi',
                trim: true
            })
        });

        // return console.log("Sizes received on server:", req.body.sizes);

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

// ! UPDATE ONE
export const updateProduct = async (req, res) => {
    try {
        const output = await productValidation.validate({
            ...req.body,
            slug: slugify(req.body.title, {
                replacement: '-',
                lower: true,
                strict: true,
                locale: 'vi',
                trim: true
            })
        });

        // return console.log("Sizes received on server:", req.body.sizes);

        const product = await Product.findByIdAndUpdate(req.params.id, output);

        if (!product) {
            return res.status(404).json({ message: "Sản phẩm không tìm thấy" });
        }

        if (!req.body) return res.status(400).json({
            status: false,
            error: 'Đã xảy ra sự cố khi gửi dữ liệu lên!',
            message: 'Tạo mới sản phẩm thành công!'
        })

        return res.status(200).json({
            status: true,
            data: product,
            message: 'Cập nhật sản phẩm thành công!'
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
