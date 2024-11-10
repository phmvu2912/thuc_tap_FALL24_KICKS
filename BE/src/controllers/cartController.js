import Cart from "../models/Cart.js";

// Lấy giỏ hàng theo userId
export const getCartByUserId = async (req, res) => {
    try {
        
        const { userId } = req.params;

        const cart = await Cart.findOne({ userId }).exec();

        if (!cart) {
            return res.status(404).json({ message: "Giỏ hàng không tồn tại!" });
        }

        return res.status(200).json({ cart });

    } catch (error) {
        console.log(error)
    }
};

// Thêm sản phẩm vào giỏ hàng
export const addItemToCart = async (req, res) => {
    try {
        const {
            userId,
            productId,
            title,
            thumbnail,
            price,
            size,
            color,
            quantity
        } = req.body;

        // Kiểm tra và trả lỗi nếu thiếu size hoặc color
        if (!size || !color) {
            return res.status(400).json({ message: "Size and color are required fields" });
        }

        // Chuyển đổi giá trị `price` và `quantity` thành số
        const validPrice = parseFloat(price) || 0;
        const validQuantity = parseInt(quantity, 10) || 0;
        const totalPrice = validPrice * validQuantity;

        if (!totalPrice) {
            return res.status(400).json({ message: "Invalid price or quantity" });
        }

        // Kiểm tra xem giỏ hàng đã tồn tại chưa
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({
                userId,
                items: [],
                totalQuantity: 0,
                totalPrice: 0
            });
        }

        // Kiểm tra sản phẩm có tồn tại trong giỏ hàng không
        const existingItem = cart.items.find(
            (item) => item.productId.toString() === productId
        );

        if (existingItem) {
            existingItem.quantity += validQuantity;
            existingItem.totalPrice += totalPrice;
        } else {
            cart.items.push({
                productId,
                title,
                thumbnail,
                price: validPrice,
                size,
                color,
                quantity: validQuantity,
                totalPrice: totalPrice
            });
        }

        cart.totalQuantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);
        cart.totalPrice = cart.items.reduce((acc, item) => acc + item.totalPrice, 0);

        await cart.save();

        return res.status(200).json({ message: "Item added to cart successfully", cart });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
